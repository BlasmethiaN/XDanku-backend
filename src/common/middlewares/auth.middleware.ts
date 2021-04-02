import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request } from 'express'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: () => void) {
    if (req.userId == null) {
      throw new Error('Not authenticated.')
    }
    next()
  }
}
