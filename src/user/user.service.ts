import { RegisterError, RegisterUserResponseDto } from './dto/register-user-response.dto'

import { CryptService } from 'src/common/lib/crypt.service'
import { Injectable } from '@nestjs/common'
import { RegisterUserDto } from './dto/register-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(private cryptService: CryptService) {}

  async register(registerUserDto: RegisterUserDto): Promise<RegisterUserResponseDto> {
    const { username, displayName, email, password } = registerUserDto
    if (registerUserDto.password != registerUserDto.passwordAgain) {
      return RegisterError.PASSWORDS_DONT_MATCH
    }
    if (await User.query().findOne('username', username)) {
      return RegisterError.USERNAME_EXISTS
    }
    if (await User.query().findOne('email', email)) {
      return RegisterError.EMAIL_EXISTS
    }
    const { id } = await User.query().insert({
      username,
      displayName,
      email,
      password: await this.cryptService.hash(password),
    })
    return { userId: id }
  }

  findAll() {
    return `This action returns all user`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
