import { Model, RelationMappings } from 'objection'
import { Tag } from './tag.entity'
import { Image } from './image.entity'

export class Contribution extends Model {
  static get tableName() {
    return 'contribution'
  }
  id: number
  description: string
  title: string
  author_id: number
  original: boolean
  tags: Tag[]
  images: Image[]

  static get relationMappings(): RelationMappings {
    return {
      tags: {
        relation: Model.ManyToManyRelation,
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
      images: {
        relation: Model.ManyToManyRelation,
        modelClass: Image,
        join: {
          from: 'contribution.id',
          through: {
            from: 'contribution_images.contribution_id',
            to: 'contribution_images.image_id',
          },
          to: 'image.id',
        },
      },
    }
  }
}
