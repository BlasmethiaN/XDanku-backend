import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { ContributionService } from 'src/contribution/contribution.service'

@Injectable()
export class CronService {
  constructor(private readonly contributionService: ContributionService) {}
  @Cron('0 30 * * * *')
  async deleteInactiveDrafts() {
    console.log('something')
    await this.contributionService.deleteInactiveDrafts()
  }
}
