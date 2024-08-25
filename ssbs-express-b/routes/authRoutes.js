const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // Importa el middleware

// Ruta de registro
router.post('/pages/register', authController.register);
// Ruta de login
router.post('/pages/login', authController.login);
// Ruta Forgot Password 
router.post('/pages/forgotpassword', authController.forgotPassword);

router.post('/pages/resetpassword', authMiddleware,  authController.resetPassword);

module.exports = router;
