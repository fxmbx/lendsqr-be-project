/* eslint-disable prettier/prettier */
import { Knex } from 'knex';
export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable('users', (table) => {
    table.string("id",36).defaultTo(knex.fn.uuid()).primary();
    table.string('username', 255).notNullable().unique();
    table.string('password').notNullable();
    table.dateTime('created_at').defaultTo(knex.fn.now());
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable('users');
};
