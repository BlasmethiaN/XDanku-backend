import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'

async function bootstrap() {
  // Model.knex(knex)

  // if (isProduction()) {
  //   await knex.migrate.latest()
  // }

  const app = await NestFactory.create(AppModule)
  app.use(helmet())
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())
  const port = process.env.PORT ?? 3000
  await app.listen(port)
}

void bootstrap()
