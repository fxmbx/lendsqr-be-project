import { Knex } from 'nestjs-knex';

exports.seed = async function (knex: Knex) {
  await knex('accounts').del();
  return await knex('accounts').insert([
    {
      account_id: '1293d2e5-4a91-11ee-a17a-0242ac110002',
      user_id: 'f2de2f7c-4a90-11ee-a17a-0242ac110002',
      balance: 1000.0,
      lien_balance: 0,
      created_at: '2023-09-03 19:34:50',
    },
    {
      account_id: '1293d2e5-4a91-11ee-a17a-0242ac110003',
      user_id: 'f2de2f7c-4a90-11ee-a17a-0242ac110001',
      balance: 1000.0,
      lien_balance: 0,
      created_at: '2023-09-03 19:34:50',
    },
  ]);
};
