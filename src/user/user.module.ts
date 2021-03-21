import { ConfigService } from 'nestjs-dotenv'
import { CryptService } from 'src/common/lib/crypt.service'
import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '10d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [UserService, CryptService],
})
export class UserModule {}
