import { AuthModule } from 'src/auth/auth.module'
import { ContributionService } from 'src/contribution/contribution.service'
import { CryptService } from 'src/common/lib/crypt.service'
import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [ContributionService, UserService, CryptService],
  exports: [UserService],
})
export class UserModule {}
