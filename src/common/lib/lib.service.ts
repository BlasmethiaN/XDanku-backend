import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'

@Injectable()
export class LibService {
  constructor(private readonly configService: ConfigService) {}

  isProduction() {
    return this.configService.get('NODE_ENV') === 'production'
  }
}
