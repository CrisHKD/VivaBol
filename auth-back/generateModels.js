const SequelizeAuto = require('sequelize-auto');
require('dotenv').config();

console.log('DB_HOST:', process.env.DB_HOST);  // Debería imprimir 'localhost'
console.log('DB_USER:', process.env.DB_USER);  // Debería imprimir tu usuario
console.log('DB_PASS:', process.env.DB_PASS);  // Debería imprimir tu contraseña
console.log('DB_NAME:', process.env.DB_NAME);  // Debería imprimir el 

const auto = new SequelizeAuto(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',  // O el dialecto que uses, como postgres
  directory: './models',  // Carpeta donde se guardarán los modelos generados
  port: process.env.DB_PORT,  // Puerto de la base de datos
});

auto.run((err, data) => {
  if (err) throw err;
  console.log('Modelos generados:', data.tables);  // Muestra las tablas generadas
  console.log('Relaciones entre tablas:', data.foreignKeys);  // Muestra las relaciones entre tablas
});