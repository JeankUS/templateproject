const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Importa el middleware

// Ruta para obtener todos los usuarios (protegida)
router.get('/', authMiddleware, userController.getAllUsers);

// Ruta para crear un nuevo usuario (protegida)
router.post('/', authMiddleware, userController.createUser);

// Ruta para obtener un usuario por ID (protegida)
router.get('/:id', authMiddleware, userController.getUserById);

// Ruta para actualizar un usuario por ID (protegida)
router.put('/:id', authMiddleware, userController.updateUser);

// Ruta para eliminar un usuario por ID (protegida)
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;
