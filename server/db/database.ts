import condig from '../../config/config';
import { Sequelize, Dialect } from 'sequelize';
import '../../dotenv';
require('dotenv').config();

const { database, username, password, host, dialect } = condig.db;

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