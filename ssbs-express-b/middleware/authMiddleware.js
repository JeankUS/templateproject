const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  // Verificamos si existe el header y si comienza con 'Bearer '
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.replace('Bearer ', '');
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }
  } else {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }
};

module.exports = authMiddleware;
