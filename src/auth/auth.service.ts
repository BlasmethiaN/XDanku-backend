import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

export type JwtPayload = {
  userId: number
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  decodeToken(token: string): number | false {
    try {
      const decoded: JwtPayload = this.jwtService.verify(token)
      return decoded.userId
    } catch (err) {
      return false
    }
  }

  sign(payload: JwtPayload) {
    return this.jwtService.sign(payload)
  }
}
