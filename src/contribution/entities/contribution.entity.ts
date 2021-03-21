import { Model } from 'objection'

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
}
