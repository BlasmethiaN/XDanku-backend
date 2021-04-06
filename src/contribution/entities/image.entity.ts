import { Model, RelationMappings } from 'objection'

import { Contribution } from './contribution.entity'
import { Draft } from './draft.entity'

export class Image extends Model {
  static get tableName() {
    return 'image'
  }

  id: string
  ext: string
  draft: Draft
  contribution: Contribution

  static get relationMappings(): RelationMappings {
    return {
      draft: {
        relation: Model.HasOneThroughRelation,
        modelClass: Draft,
        join: {
          from: 'image.id',
          through: {
            from: 'draft_images.image_id',
            to: 'draft_images.draft_id',
          },
          to: 'draft.id',
        },
      },
      contribution: {
        relation: Model.HasOneThroughRelation,
        modelClass: Contribution,
        join: {
          from: 'image.id',
          through: {
            from: 'contribution_images.image_id',
            to: 'contribution_images.contribution_id',
          },
          to: 'contribution.id',
        },
      },
    }
  }
}
