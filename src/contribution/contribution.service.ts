import { CreateContributionDto } from './dto/create-contribution.dto'
import { Draft } from './entities/draft.entity'
import { Image } from './entities/image.entity'
import { Injectable } from '@nestjs/common'
import { UpdateContributionDto } from './dto/update-contribution.dto'
import { User } from 'src/user/entities/user.entity'

@Injectable()
export class ContributionService {
  create(createContributionDto: CreateContributionDto) {
    return 'This action adds a new contribution'
  }

  async createDraft(userId: number) {
    return await Draft.query().insert({ author_id: userId })
  }

  async createImage(draftId: string, userId: number, ext: string) {
    const draft = await Draft.query().findById(draftId).where('author_id', userId)
    if (!draft) throw new Error('Draft does not exist')
    const image = await Image.query().insert({ ext })
    await image.$relatedQuery('draft').relate(draft)
    return image.id
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
