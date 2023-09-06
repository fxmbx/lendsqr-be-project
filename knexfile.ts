/* eslint-disable prettier/prettier */
import { Knex } from 'knex';
export const development: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: 'mysql-2831fdff-olutundelearn-1dd7.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_Mxu_3GxGMFr4GTq2cqV',
    database: 'defaultdb',
    port: 25372,
  },
  migrations: {
    directory: './src/db/migrations',
  },
  seeds: {
    directory: './src/db/seeds',
  },
};

export const production: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 25372,
  },
  migrations: {
    directory: './src/db/migrations',
  },
  seeds: {
    directory: './src/db/seeds',
  },
};
