import { Model } from 'objection'

export class Draft extends Model {
  static get tableName() {
    return 'draft'
  }

  id: string
  author_id: number
}
