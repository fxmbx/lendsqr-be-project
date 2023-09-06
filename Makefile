knex_init:
	npx knex init
account: 
	 npx knex migrate:make users
migration:
	npx knex migrate:make migration_name -x ts
migrate_account:
	npx knex migrate:make create_accounts_table_ts
server:
	npm run start:dev
migrate:
	knex migrate:latest
seed:
	knex seed:run
