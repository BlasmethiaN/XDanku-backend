import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { ContributionService } from 'src/contribution/contribution.service'

@Injectable()
export class TaskService {
  @Cron('0 30 * * * *')
  async deleteInactiveDrafts() {
    await ContributionService.deleteInactiveDrafts()
  }
}
