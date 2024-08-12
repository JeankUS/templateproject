const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuración común para todos los entornos
const commonConfig = {
  dialect: 'postgres',
  dialectOptions: {
    ssl: process.env.DB_SSL === 'true' ? {
      require: true,
      rejectUnauthorized: false // Esto es necesario para algunos proveedores de cloud
    } : false
  },
  logging: false,  // Desactiva el logging SQL en producción
};

// Configuración de Sequelize para los diferentes entornos
const development = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  ...commonConfig,
};

const test = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_TEST,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  ...commonConfig,
};

const production = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_PRODUCTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  ...commonConfig,
};

// Crear una instancia de Sequelize basada en el entorno actual
const sequelize = new Sequelize(development.database, development.username, development.password, development);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente con la base de datos.');
  } catch (error) {
    console.error('No se pudo conectar con la base de datos:', error);
  }
};

testConnection();

module.exports = sequelize;
module.exports.development = development;
module.exports.test = test;
module.exports.production = production;
