declare module '/server/db/database' {
  import { Sequelize } from 'sequelize';

  const sequelize: Sequelize;
  export default sequelize;
}
