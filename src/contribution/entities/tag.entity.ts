import { Model, RelationMappings } from 'objection'

import { Contribution } from './contribution.entity'

export class Tag extends Model {
  static get tableName() {
    return 'tag'
  }

  id: number
  tag_name: string
  contribution: Contribution

  static get relationMappings(): RelationMappings {
    return {
      contribution: {
        relation: Model.HasOneThroughRelation,
        modelClass: Contribution,
        join: {
          from: 'tag.id',
          through: {
            from: 'contribution_tags.tag_id',
            to: 'contribution_tags.contribution_id',
          },
          to: 'contribution.id',
        },
      },
    }
  }
}
