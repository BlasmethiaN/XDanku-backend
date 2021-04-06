import { Model, RelationMappings } from 'objection'
import { Tag } from './tag.entity'

export class Contribution extends Model {
  static get tableName() {
    return 'contribution'
  }
  id: number
  description: string
  title: string
  author_id: number
  original: boolean
  tag: Tag

  static get relationMappings(): RelationMappings {
    return {
      tag: {
        relation: Model.HasOneThroughRelation,
        modelClass: Tag,
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
