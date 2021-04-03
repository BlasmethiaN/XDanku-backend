import * as Knex from 'knex'

import { uuid } from '../lib'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('draft', function (table) {
    uuid(table, knex)
    table.integer('author_id').references('id').inTable('user').notNullable()
    table.dateTime('added_time').notNullable().defaultTo(knex.fn.now())
  })

  return knex.schema.createTable('draft_images', function (table) {
    table.uuid('draft_id').references('id').inTable('draft').notNullable().onDelete('CASCADE')
    table.uuid('image_id').references('id').inTable('image').notNullable().onDelete('CASCADE')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('draft_images')
  return knex.schema.dropTable('draft')
}
