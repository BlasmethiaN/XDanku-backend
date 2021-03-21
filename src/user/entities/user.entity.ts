import { Model, RelationMappings } from 'objection'

import { Contribution } from 'src/contribution/entities/contribution.entity'
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
  contributions: Contribution[]

  static get relationMappings(): RelationMappings {
    return {
      contributions: {
        relation: Model.HasManyRelation,
        modelClass: Contribution,
        join: {
          from: 'user.id',
          to: 'contribution.author_id',
        },
      },
    }
  }

  get withoutPassword(): Omit<User, 'password'> {
    return _.omit(this, 'password')
  }
}
