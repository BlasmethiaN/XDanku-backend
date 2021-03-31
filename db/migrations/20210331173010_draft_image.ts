import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('draft_image', function (table) {
    table.increments('id').primary().notNullable()
    table.integer('author_id').references('id').inTable('user').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('draft_image')
}
