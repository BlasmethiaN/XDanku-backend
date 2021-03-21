import { Model, RelationMappings } from 'objection'
import { Exclude } from 'class-transformer'
import { Contribution } from 'src/contribution/entities/contribution.entity'

export class User extends Model {
  static get tableName() {
    return 'user'
  }

  id: number
  username: string
  displayName: string
  email: string

  @Exclude()
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
}
