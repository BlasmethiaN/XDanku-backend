import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { ContributionService } from 'src/contribution/contribution.service'

@Injectable()
export class CronService {
  @Cron('0 30 * * * *')
  async deleteInactiveDrafts() {
    console.log('something')
    await ContributionService.deleteInactiveDrafts()
  }
}
