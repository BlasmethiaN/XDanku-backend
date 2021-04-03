import * as Knex from 'knex'

import { uuid } from '../lib'

export async function up(knex: Knex): Promise<void> {
  await knex.raw('create extension if not exists "uuid-ossp"')

  await knex.schema.createTable('image', function (table) {
    uuid(table, knex)
    table.string('ext').notNullable()
  })

  return knex.schema.createTable('contribution_images', function (table) {
    table
      .integer('contribution_id')
      .references('id')
      .inTable('contribution')
      .notNullable()
      .onDelete('CASCADE')
    table.uuid('image_id').references('id').inTable('image').notNullable().onDelete('CASCADE')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('contribution_images')
  await knex.schema.dropTable('image')
  return knex.raw('drop extension if exists "uuid-ossp"')
}
