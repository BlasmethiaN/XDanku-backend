/* eslint-disable */

import Knex from 'knex'
import knexSettings from '../knexfile'

const environment = process.env.NODE_ENV ?? 'development'
const config = knexSettings[environment]
const knex: Knex = require('knex')(config)

export { knex }
