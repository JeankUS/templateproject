const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

function generateRandomString(length) {
  const pattern = /[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/;
  let randomString = '';
  while (randomString.length < length) {
      const byte = crypto.randomBytes(1).toString('hex');
      const char = String.fromCharCode(parseInt(byte, 16));
      if (pattern.test(char)) {
          randomString += char;
      }
  }
  return randomString;
}

// Registro de usuario
exports.register = async (req, res) => {
  const { fullname, email, mobile, password } = req.body;

  console.log(fullname)
  try {
    // Verificar si el usuario ya existe
    const userExists = await db.User.findOne({ where: { email } });
    if (userExists) {
      console.log('Usuario ya existe:', userExists);
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Contraseña encriptada:', hashedPassword);

    // Iniciar transacción para asegurarse de que ambas tablas se actualicen correctamente
    const transaction = await db.sequelize.transaction();

    try {
      // Crear el usuario con el rol de "User" (role_id: 2)
      const user = await db.User.create(
        {
          fullname,
          email,
          mobile,
          role_id: 2, // Asignar automáticamente el rol de "User"
        },
        { transaction }
      );
      console.log('Usuario creado:', user);

      // Crear el login con la contraseña y el email en la tabla login
      const login = await db.Login.create(
        {
          iduser: user.iduser,
          email: user.email, // Asegurarse de que el email se guarda en la tabla Login
          password: hashedPassword,
          requires_change_pass: true
        },
        { transaction }
      );
      console.log('Login creado:', login);

      // Confirmar la transacción
      await transaction.commit();

      // Generar el token
      const token = jwt.sign({ iduser: user.iduser }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
      console.log('Token generado:', token);

      res.status(201).json({ token });
    } catch (error) {
      // Revertir la transacción en caso de error
      console.error('Error en la transacción:', error);
      await transaction.rollback();
      res.status(500).json({ error: 'Error al registrar el usuario' });
    }
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)
  try {
    // Verificar si el usuario existe en la tabla User
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      console.log('Usuario no encontrado');
      return res.status(400).json({ error: 'Credenciales no válidas' });
    }

    // Verificar la contraseña en la tabla Login
    const loginRecord = await db.Login.findOne({ where: { iduser: user.iduser } });
    if (!loginRecord) {
      console.log('Login no encontrado para el usuario');
      return res.status(400).json({ error: 'Credenciales no válidas' });
    }

    const validPassword = await bcrypt.compare(password, loginRecord.password);
    if (!validPassword) {
      console.log('Contraseña no válida');
      return res.status(400).json({ error: 'Credenciales no válidas' });
    }

    console.log(loginRecord.requires_change_pass )

    // Generar el token
    const token = jwt.sign({ iduser: user.iduser, require_change_password: loginRecord.requires_change_pass }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
    console.log('Token generado para login:', token);

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email} = req.body;
  try {

    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      console.log('Usuario no encontrado, verifique su email')
      return res.status(400).json({ error: 'Usuario no encontrado, verifique su email' });
    }
    
    const tempPassword = generateRandomString(16);

    const loginRecord = await db.Login.findOne({ where: { iduser: user.iduser } });
    if (loginRecord) {
      //Encripta la contraseña nueva temporal 
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(tempPassword, salt);
      //Guarda los cambios para que ahora la contraseña nueva sea la temporal
      loginRecord.password = hashedPassword;
      loginRecord.requires_change_pass = true;
      await loginRecord.save();
    }
    
    // ENVIA EL EMAIL DE RECUPERACION 
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',  // Servidor SMTP de EmailJS
      port: 587,  // Puerto SMTP (puede variar según la configuración de EmailJS)
      secure: false,  // Usa TLS
      auth: {
        user: 'studiossbarber@gmail.com',  // Tu usuario SMTP de EmailJS
        pass: 'pzbo ipel osnl lexn' // Tu contraseña SMTP de EmailJS
      }
    });

    const mailOptions = {
      from: 'studiossbarber@gmail.com',  // Dirección de correo del remitente
      to: email,  // Dirección de correo del destinatario
      subject: 'Recover your password',
      text: 'Use this temporaly password to login and change your old password',
      html : `<h1> Your temporaly password is: <strong style="color:red"> ${tempPassword}</strong> </h1>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error al enviar correo de recuperacion de contraseña:', error);
        } else {
          console.log(`Se ha enviado la contraseña de recuperacion a ${email} :`, info.response);
        }
    });
    

    res.status(200).json({ message : `Email was sended to: ${email}`});

  } catch (error) {
    console.error('Error al recuperar contraseña:', error);
    res.status(500).json({ error: 'No se puedo enviar el correo de recuperacion' });
  }

}

exports.resetPassword = async(req,res) => {
    console.log(req.body)
    const { newPassword, iduser} = req.body;
    try {
      console.log(newPassword + "  " + iduser)
      const user = await db.User.findOne({ where: { iduser } });
      const loginRecord = await db.Login.findOne({ where: { iduser: user.iduser } });
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      //Guarda los cambios para que ahora la contraseña nueva sea la temporal
      loginRecord.password = hashedPassword;
      loginRecord.requires_change_pass = false;
      await loginRecord.save();
      res.status(200).json({ message: 'Se reseteado la contraseña' });
    } catch (error) {
        console.error('Error al conectar con servidor:', error);
        res.status(500).json({ error: 'No se ha podido comunicar con el servidor' });
    }
}