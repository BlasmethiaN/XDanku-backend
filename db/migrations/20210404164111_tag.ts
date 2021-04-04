import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('tag', function (table) {
    table.increments('id').primary().notNullable()
    table.string('tag_name').notNullable()
  })

  return knex.schema.createTable('contribution_tags', function (table) {
    table.integer('tag_id').references('id').inTable('tag').notNullable().onDelete('CASCADE')
    table
      .integer('contribution_id')
      .references('id')
      .inTable('contribution')
      .notNullable()
      .onDelete('CASCADE')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('contribution_tag')
  return knex.schema.dropTable('tag')
}
