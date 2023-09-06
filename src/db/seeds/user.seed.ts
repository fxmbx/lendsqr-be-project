import { Knex } from 'nestjs-knex';

exports.seed = async function (knex: Knex) {
  await knex('users').del();
  return await knex('users').insert([
    {
      id: 'f2de2f7c-4a90-11ee-a17a-0242ac110002',
      username: 'stfunbi',
      password: '$2b$10$.4tf1tnQSZixPB09jHd.EOsRyMlY/c5AFka46r4miTVXoyS/oDeFW',
      created_at: '2023-09-03 19:34:50',
    },
    {
      id: 'f2de2f7c-4a90-11ee-a17a-0242ac110001',
      username: 'st_funbi',
      password: '$2b$10$.4tf1tnQSZixPB09jHd.EOsRyMlY/c5AFka46r4miTVXoyS/oDeFW',
      created_at: '2023-09-03 19:34:50',
    },
  ]);
};
