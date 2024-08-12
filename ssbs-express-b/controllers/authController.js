const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro de usuario
exports.register = async (req, res) => {
  const { fullname, email, mobile, password } = req.body;

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

    // Generar el token
    const token = jwt.sign({ iduser: user.iduser }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
    console.log('Token generado para login:', token);

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
