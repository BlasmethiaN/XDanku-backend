import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('image', function (table) {
    table.integer('contribution_id').references('id').inTable('contribution').notNullable()
    table.binary('image_file').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('image')
}
