import { CreateContributionDto } from './dto/create-contribution.dto'
import { Injectable } from '@nestjs/common'
import { UpdateContributionDto } from './dto/update-contribution.dto'
import { User } from 'src/user/entities/user.entity'

@Injectable()
export class ContributionService {
  create(createContributionDto: CreateContributionDto) {
    return 'This action adds a new contribution'
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
