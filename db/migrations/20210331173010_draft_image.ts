import * as Knex from 'knex'
import { uuid } from '../lib'

export async function up(knex: Knex): Promise<void> {
  await knex.raw('create extension if not exists "uuid-ossp"')
  return knex.schema.createTable('draft_image', function (table) {
    uuid(table, knex)
    table.integer('author_id').references('id').inTable('user').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('draft_image')
  return knex.raw('drop extension if exists "uuid-ossp"')
}
