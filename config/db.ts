require('dotenv').config();

const defaultConfig = {
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'password',
  host: process.env.DB_HOST ?? 'localhost',
  port: process.env.DB_PORT ?? 5432,
  dialect: 'postgres',
  migrationStorage: 'sequelize',
  dialectOptions: {
    bigNumberStrings: true
  }
};

const dbName = process.env.DB_NAME ?? 'cheeta';

const environments = {
  development: { ...defaultConfig, database: `${dbName}_development` },
  test: { ...defaultConfig, database: `${dbName}_test` },
  production: { ...defaultConfig, database: `${dbName}_production` }
};

interface DbConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number | string;
  dialect: string;
  migrationStorage: string;
  dialectOptions?: { bigNumberStrings: boolean };
}

export const dbConfig = (): DbConfig => {
  const environment = (process.env.ENVIRONMENT || 'development') as keyof typeof environments;

  if (environments[environment]) {
    return environments[environment];
  } else {
    throw new Error(`Invalid environment: ${environment}`);
  }
};