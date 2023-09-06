/* eslint-disable prettier/prettier */
import { Knex } from 'knex';
export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable('accounts', (table) => {
    table.string('account_id', 36).primary().defaultTo(knex.fn.uuid());
    table.string('user_id').references('users.id').unique();
    table.decimal('balance', 8, 2).notNullable().defaultTo(0.0);
    table.decimal('lien_balance', 8, 2).notNullable().defaultTo(0.0);
    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.index('user_id')
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable('accounts');
};
