import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('draft', (table) => {
    table.dateTime('last_active').notNullable().defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('draft', (table) => {
    table.dropColumn('last_active')
  })
}
