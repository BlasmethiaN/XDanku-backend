import { CreateContributionDto } from './dto/create-contribution.dto'
import { Draft } from './entities/draft.entity'
import { Image } from './entities/image.entity'
import { Injectable } from '@nestjs/common'
import { UpdateContributionDto } from './dto/update-contribution.dto'
import { User } from 'src/user/entities/user.entity'
import fs from 'fs-extra'
import { Contribution } from './entities/contribution.entity'
import _ from 'lodash'
import { Tag } from './entities/tag.entity'

@Injectable()
export class ContributionService {
  async createContribution(
    createContributionDto: CreateContributionDto,
    userId: number,
    draftId: string
  ) {
    const { title, description, tags, original } = createContributionDto
    const contribution = await Contribution.query().insert({
      description,
      title,
      author_id: userId,
      original,
    })
    _.forEach(tags, async (tag) => {
      const trimTag = _.trim(_.lowerCase(tag))
      const exisTag = await this.findTagByName(trimTag)

      if (exisTag.length === 0) {
        await contribution.$relatedQuery('tags').insert({ tag_name: trimTag })
      } else {
        await Tag.relatedQuery('contribution').for(exisTag[0].id).relate(contribution.id)
      }
    })

    const src: string = `./uploads/temp/${draftId}`
    const dest: string = `./uploads/contribution/${contribution.id}`

    try {
      await fs.move(src, dest)
      const images = await Image.query().joinRelated('draft').where('draft.id', draftId)
      await contribution.$relatedQuery('images').relate(images)
      await this.deleteDraft(draftId, userId, true, true)

      console.log('success moved file!')
    } catch (err) {
      console.error(err)
    }

    return contribution.id
  }

  async createDraft(userId: number) {
    return await Draft.query().insert({ author_id: userId })
  }

  async deleteDraft(draftId: string, userId: number, dbOnly = false, draftOnly = false) {
    const draft = await this.findDraft(draftId, userId)
    if (!draft) throw new Error('Draft does not exist')
    if (!dbOnly) await fs.remove(`./uploads/temp/${draftId}`)
    if (!draftOnly)
      await Image.query()
        .delete()
        .whereIn(
          'id',
          Image.query().select('image.id').joinRelated('draft').where('draft.id', draftId)
        )
    const affected = await Draft.query().deleteById(draftId)
    return affected > 0
  }

  async createImage(draftId: string, userId: number, ext: string) {
    const draft = await this.findDraft(draftId, userId)
    if (!draft) throw new Error('Draft does not exist')
    const image = await Image.query().insert({ ext })
    await image.$relatedQuery('draft').relate(draft)
    return image.id
  }

  async deleteImage(draftId: string, imageId: string, userId: number) {
    const draft = await this.findDraft(draftId, userId)
    if (!draft) throw new Error('Draft does not exist')
    const affected = await Image.query()
      .delete()
      .whereIn(
        'id',
        Image.query()
          .select('image.id')
          .joinRelated('draft')
          .where('draft.id', draftId)
          .where('image.id', imageId)
      )
    return affected > 0
  }

  findDraft(draftId: string, userId: number) {
    return Draft.query().findById(draftId).where('author_id', userId)
  }

  findTagByName(tagName: string) {
    return Tag.query().select('id').where('tag_name', tagName)
  }

  findAll() {
    return `This action returns all contribution`
  }

  findByUser(userId: number) {
    return User.relatedQuery('contributions').for(userId)
  }

  findOne(id: number) {
    return `This action returns a #${id} contribution`
  }

  update(id: number, updateContributionDto: UpdateContributionDto) {
    return `This action updates a #${id} contribution`
  }

  remove(id: number) {
    return `This action removes a #${id} contribution`
  }
}
