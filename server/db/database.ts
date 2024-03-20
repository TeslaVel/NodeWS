import developmentConfig from '../../config/config';
import { Sequelize } from 'sequelize';
import '../../dotenv';
require('dotenv').config();

const sequelize = new Sequelize(
  developmentConfig.db.database,
  developmentConfig.db.username,
  developmentConfig.db.password, {
  host: developmentConfig.db.host,
  dialect: 'postgres',
});

sequelize.sync({ force: false })
.then(() => {
  console.log('Base de datos sincronizada');
})
.catch((error) => {
  console.error('Error al sincronizar la base de datos:', error);
});

export default sequelize;