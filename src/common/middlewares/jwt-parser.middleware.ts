import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'

import { AuthService } from 'src/auth/auth.service'
import { UserService } from 'src/user/user.service'

@Injectable()
export class JwtParserMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    const cookie = req.cookies.token as string

    if (cookie) {
      const token = cookie.split(' ')[1] // ["Bearer", "aiwjdwaoiwjjadwwiojdodjojadwojido"]
      const userId = this.authService.decodeToken(token)
      if (!userId) {
        res.clearCookie('token')
        throw new Error('Failed to decode token')
      }
      if (!(await this.userService.findOne(userId))) {
        res.clearCookie('token')
        throw new Error('User does not exist')
      }
      req.userId = userId
    }

    next()
  }
}
