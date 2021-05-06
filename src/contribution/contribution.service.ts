import { CreateContributionDto } from './dto/create-contribution.dto'
import { ContributionError } from './dto/create-contribution-response.dto'
import { Draft } from './entities/draft.entity'
import { Image } from './entities/image.entity'
import { Injectable } from '@nestjs/common'
import { UpdateContributionDto } from './dto/update-contribution.dto'
import { User } from 'src/user/entities/user.entity'
import fs from 'fs-extra'
import { Contribution } from './entities/contribution.entity'
import _ from 'lodash'
import { Tag } from './entities/tag.entity'
import { CreateResponse } from 'src/common/types/response.dto'
import { raw } from 'objection'
import { knex } from 'db/knex'

@Injectable()
export class ContributionService {
  async createContribution(
    createContributionDto: CreateContributionDto,
    userId: number,
    draftId: string
  ) {
    const { title, description, tags, original } = createContributionDto
    const src: string = `./uploads/temp/${draftId}`
    const exists = fs.existsSync(src)
    if (!exists) {
      return CreateResponse.error(ContributionError.NO_IMAGE)
    }
    fs.readdir(src, function (err, files) {
      if (err) {
        console.log(err)
      } else {
        if (!files.length) {
          return CreateResponse.error(ContributionError.NO_IMAGE)
        }
      }
    })
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
    return CreateResponse.data({ contributionId: contribution.id })
  }

  async deleteContribution(contributionId: number, userId: number) {
    const contribution = await this.findContribution(contributionId, userId)
    if (!contribution) throw new Error('Contribution does not exist')
    await fs.remove(`./uploads/contribution/${contributionId}`)
    await Image.query()
      .delete()
      .whereIn(
        'id',
        Image.query()
          .select('image.id')
          .joinRelated('contribution')
          .where('contribution.id', contributionId)
      )
    return await contribution.$query().delete()
  }

  async createDraft(userId: number) {
    const draftId = await Draft.query().insert({ author_id: userId })
    return CreateResponse.data(draftId)
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

  static deleteInactiveDrafts() {
    return Draft.query()
      .delete()
      .where(raw('extract (epoch from (timestamp now() - timestamp last_active))::integer/60 > 10'))
  }

  updateDraftActivity(draftId, userId) {
    return Draft.query()
      .update({ last_active: knex.fn.now() })
      .findById(draftId)
      .where('author_id', userId)
  }

  findContribution(contributionId: number, userId: number) {
    return Contribution.query().findById(contributionId).where('author_id', userId)
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
