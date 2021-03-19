import { CryptService } from 'src/common/lib/crypt.service'
import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  controllers: [UserController],
  providers: [UserService, CryptService],
})
export class UserModule {}
