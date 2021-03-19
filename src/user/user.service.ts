import { RegisterError, RegisterUserResponseDto } from './dto/register-user-response.dto'

import { CryptService } from 'src/common/lib/crypt.service'
import { Injectable } from '@nestjs/common'
import { RegisterUserDto } from './dto/register-user.dto'
import { User } from './entities/user.entity'
import { LoginUserDto } from './dto/login-user.dto'
import { LoginError, LoginUserResponseDto } from './dto/login-user-response.dto'

@Injectable()
export class UserService {
  constructor(private cryptService: CryptService) {}

  async register(registerUserDto: RegisterUserDto): Promise<RegisterUserResponseDto> {
    const { username, displayName, email, password } = registerUserDto
    if (registerUserDto.password != registerUserDto.passwordAgain) {
      return { error: RegisterError.PASSWORDS_DONT_MATCH }
    }
    if (await User.query().findOne('username', username)) {
      return { error: RegisterError.USERNAME_EXISTS }
    }
    if (await User.query().findOne('email', email)) {
      return { error: RegisterError.EMAIL_EXISTS }
    }
    const { id } = await User.query().insert({
      username,
      displayName,
      email,
      password: await this.cryptService.hash(password),
    })
    return { userId: id }
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginUserResponseDto> {
    const { username, password } = loginUserDto
    const user = await User.query().findOne('username', username)

    if (!user) {
      return { error: LoginError.WRONG_USERNAME }
    }
    if (!(await this.cryptService.compare(password, user.password))) {
      return { error: LoginError.WRONG_PASSWORD }
    }
    return { userId: user.id }
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
