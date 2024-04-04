require('dotenv').config();

const db_name = process.env.DB_NAME ?? 'cheeta';
const db_user = process.env.DB_USER ?? 'postgres';
const db_pass = process.env.DB_PASSWORD ?? 'password';
const db_host = process.env.DB_HOST ?? 'localhost';
const db_port = process.env.DB_PORT ?? 5432

const defaultValue = {
  username: db_user,
  password: db_pass,
  host: db_host,
  port: db_port,
  dialect: 'postgres',
  migrationStorage: 'sequelize',
  dialectOptions: {
    bigNumberStrings: true
  }
}

const development = {
  ...defaultValue,
  database: `${db_name}_development`,
};

const test = {
  ...defaultValue,
  database: `${db_name}_test`,
};

const production = {
  ...defaultValue,
  database: `${db_name}_production`,
};

interface DbConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number | string ;
  dialect: string;
  migrationStorage: string;
  dialectOptions?: { bigNumberStrings: boolean };
}

const getDbConfig = (): DbConfig => {
  const environment = process.env.ENVIRONMENT || 'development';

  switch (environment) {
    case 'development':
      return development;
    case 'test':
      return test;
    case 'production':
      return production;
    default:
      throw new Error(`Invalid environment: ${environment}`);
  }
}

export default {
  db: getDbConfig(),
};
