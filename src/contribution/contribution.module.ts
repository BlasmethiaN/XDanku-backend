import { ContributionController } from './contribution.controller'
import { ContributionService } from './contribution.service'
import { Module } from '@nestjs/common'

@Module({
  controllers: [ContributionController],
  providers: [ContributionService],
  exports: [ContributionService],
})
export class ContributionModule {}
