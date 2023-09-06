import { Knex } from 'nestjs-knex';

exports.seed = async function (knex: Knex) {
  await knex('transactions').del();
  return await knex('transactions').insert([
    {
      transaction_id: 'd62e40f0-4a97-11ee-a17a-0242ac110002',
      account_id: '1293d2e5-4a91-11ee-a17a-0242ac110002',
      user_id: 'f2de2f7c-4a90-11ee-a17a-0242ac110002',
      ref_number: '7e3b8cbb-689b-4982-bbe9-c22d00f43468',
      amount: 680.0,
      transaction_type: 'DEBIT',
      description:
        'Transfer from 1293d2e5-4a91-11ee-a17a-0242ac110002 to 1293d2e5-4a91-11ee-a17a-0242ac110003',
      created_at: '2023-09-03 19:34:50',
    },
    {
      transaction_id: 'd62e40f0-4a97-11ee-a17a-0242ac110002',
      account_id: '11293d2e5-4a91-11ee-a17a-0242ac110003',
      user_id: 'f2de2f7c-4a90-11ee-a17a-0242ac110001',
      ref_number: '7e3b8cbb-689b-4982-bbe9-c22d00f43468',
      amount: 680.0,
      transaction_type: 'CREDIT',
      description:
        'Transfer from 1293d2e5-4a91-11ee-a17a-0242ac110002 to 1293d2e5-4a91-11ee-a17a-0242ac110003',
      created_at: '2023-09-03 19:34:50',
    },
  ]);
};
