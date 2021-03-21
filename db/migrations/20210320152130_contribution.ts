import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('contribution', function (table) {
    table.increments('id').primary().notNullable()
    table.string('description', 500).nullable()
    table.string('title', 64).notNullable()
    table.dateTime('added_time').notNullable().defaultTo(knex.fn.now())
    table.integer('author_id').references('id').inTable('user').notNullable()
    table.boolean('original').nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('contribution')
}
