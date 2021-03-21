import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from 'nestjs-dotenv'
import { ContributionModule } from './contribution/contribution.module'
import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UserModule, ContributionModule, ConfigModule.forRoot()],
})
export class AppModule {}
