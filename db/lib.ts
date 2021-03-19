import Knex from 'knex'

export const uuid = (table: Knex.CreateTableBuilder, knex: Knex) => {
  table.uuid('id').unique().defaultTo(knex.raw('uuid_generate_v4()'))
}
