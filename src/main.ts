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

  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000', 'https://xdanku.vercel.app', 'http://localhost:8080'],
  })

  app.use(helmet())
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())
  const port = process.env.PORT ?? 4000
  await app.listen(port)
}

void bootstrap()
