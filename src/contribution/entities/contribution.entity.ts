import { Model, RelationMappings } from 'objection'

export class Contribution extends Model {
  static get tableName() {
    return 'contribution'
  }
  id: number
  description: string
  title: string
  added_time: string
  author: number
  original: boolean

  static get relationMappings(): RelationMappings {
    return {
      contribution: {
        relation: Model.HasOneThroughRelation,
        modelClass: Contribution,
        join: {
          from: 'contribution.id',
          through: {
            from: 'contribution_tags.contribution_id',
            to: 'contribution_tags.tag_id',
          },
          to: 'tag.id',
        },
      },
    }
  }
}
