import { Model } from 'objection'
import _ from 'lodash'

export class User extends Model {
  static get tableName() {
    return 'user'
  }

  id: number
  username: string
  displayName: string
  email: string
  password: string

  get withoutPassword(): Omit<User, 'password'> {
    return _.omit(this, 'password')
  }
}
