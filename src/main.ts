import { AppModule } from './app.module'
import { Model } from 'objection'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { knex } from 'db/knex'

const isProduction = () => process.env.NODE_ENV === 'production'

async function bootstrap() {
  Model.knex(knex)

  if (isProduction()) {
    await knex.migrate.latest()
  }

  const app = await NestFactory.create(AppModule)
  app.use(helmet())
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
}

void bootstrap()
