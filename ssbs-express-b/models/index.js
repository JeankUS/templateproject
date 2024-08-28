'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// Cargar la configuración desde database.js
const sequelize = require('../config/database');
const db = {};

// Cargar automáticamente todos los modelos en la carpeta models
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  console.log(`Registering model: ${modelName}`);
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
console.log(db); // Esto te mostrará todos los modelos que se están registrando

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
