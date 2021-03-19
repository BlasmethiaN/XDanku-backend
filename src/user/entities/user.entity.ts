import { Model } from 'objection'

export class User extends Model {
  static get tableName() {
    return 'user'
  }

  id: number
  username: string
  displayName: string
  email: string
  password: string
}
