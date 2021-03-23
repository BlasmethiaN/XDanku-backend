import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { ContributionModule } from './contribution/contribution.module'
import { JwtParserMiddleware } from './common/middlewares/jwt-parser.middleware'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    AuthModule,
    ContributionModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtParserMiddleware).forRoutes('/')
  }
}
