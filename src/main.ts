import { AppModule } from './app.module'
import { Model } from 'objection'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import helmet from 'helmet'
import { knex } from 'db/knex'

async function bootstrap() {
  Model.knex(knex)
  const app = await NestFactory.create(AppModule)
  app.use(helmet())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
}

void bootstrap()
