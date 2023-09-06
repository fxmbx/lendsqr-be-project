/* eslint-disable prettier/prettier */
import { Knex } from 'knex';
export async function up(knex: Knex): Promise<void> {

  return knex.schema.createTable('transactions', (table) => {
    table.string('transaction_id', 36).primary().defaultTo(knex.fn.uuid());
    table.string('account_id').references('accounts.account_id');
    table.string('user_id').references('users.id');
    table.string('ref_number').notNullable();
    table.decimal('amount', 8, 2).notNullable();
    table.string('transaction_type').notNullable().defaultTo('CREDIT');
    table.string('description').notNullable().defaultTo('INBOUND');
    
    table.dateTime('created_at').defaultTo(knex.fn.now());
    
    table.index('account_id');
    table.index(['user_id',]);
    table.index('transaction_type');
    table.index('user_id','account_id');
  });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('transactions');
}
