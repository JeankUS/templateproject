const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const app = express();
const db = require('./models');
const routes = require('./routes'); // Importa el archivo index.js de la carpeta routes

// Middleware para habilitar CORS
app.use(cors({
  origin: '*', // Permite solicitudes desde este origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  credentials: true // Permitir envío de cookies y cabeceras de autorización
}));

// Middleware para manejar JSON
app.use(express.json());

// Usar las rutas organizadas en routes/index.js
app.use('/api', routes);

// Iniciar el servidor y conectar a la base de datos
const PORT = process.env.PORT || 4000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Error al conectar a la base de datos:', err);
});
