import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user', function (table) {
    table.increments('id').primary().notNullable()
    table.string('username').unique().notNullable()
    table.string('displayName', 20).notNullable()
    table.string('email').unique().notNullable()
    table.string('password').notNullable()
    table.binary('avatar').nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user')
}
