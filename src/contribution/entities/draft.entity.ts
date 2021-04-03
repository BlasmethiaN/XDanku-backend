import { Model, RelationMappings } from 'objection'

import { Image } from './image.entity'

export class Draft extends Model {
  static get tableName() {
    return 'draft'
  }

  id: string
  author_id: number
  images: Image[]

  static get relationMappings(): RelationMappings {
    return {
      images: {
        relation: Model.ManyToManyRelation,
        modelClass: Image,
        join: {
          from: 'draft.id',
          through: {
            from: 'draft_images.draft_id',
            to: 'draft_images.image_id',
          },
          to: 'image.id',
        },
      },
    }
  }
}
