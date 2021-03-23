import { AuthModule } from 'src/auth/auth.module'
import { ContributionModule } from 'src/contribution/contribution.module'
import { CryptService } from 'src/common/lib/crypt.service'
import { LibService } from 'src/common/lib/lib.service'
import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [AuthModule, ContributionModule],
  controllers: [UserController],
  providers: [UserService, CryptService, LibService],
  exports: [UserService],
})
export class UserModule {}
