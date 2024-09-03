import { dbConfig } from '../../config/db';
import { Sequelize, Dialect } from 'sequelize';
import '../../dotenv';
require('dotenv').config();

const { database, username, password, host, dialect } = dbConfig();

const sequelize = new Sequelize(
  database,
  username,
  password, {
  host: host,
  dialect: dialect as Dialect,
});

sequelize.sync({ force: false })
.then(() => {
  console.log('Base de datos sincronizada');
})
.catch((error) => {
  console.error('Error al sincronizar la base de datos:', error);
});

export default sequelize;