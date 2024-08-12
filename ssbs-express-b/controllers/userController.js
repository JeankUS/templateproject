const db = require('../models');

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al obtener los usuarios' });
  }
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const newUser = await db.User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al crear el usuario' });
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al obtener el usuario' });
  }
};

// Actualizar un usuario por ID
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await db.User.update(req.body, {
      where: { iduser: req.params.id },
    });
    if (updatedUser[0] === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado o sin cambios' });
    }
    res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al actualizar el usuario' });
  }
};

// Eliminar un usuario por ID
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await db.User.destroy({
      where: { iduser: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al eliminar el usuario' });
  }
};
