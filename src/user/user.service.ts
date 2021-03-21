import { LoginError, LoginUserResponseDto } from './dto/login-user-response.dto'
import { RegisterError, RegisterUserResponseDto } from './dto/register-user-response.dto'

import { CreateResponse } from 'src/common/types/response.dto'
import { CryptService } from 'src/common/lib/crypt.service'
import { Injectable } from '@nestjs/common'
import { LoginUserDto } from './dto/login-user.dto'
import { RegisterUserDto } from './dto/register-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(private cryptService: CryptService) {}

  async register(registerUserDto: RegisterUserDto): Promise<RegisterUserResponseDto> {
    const { username, displayName, email, password } = registerUserDto
    if (await User.query().findOne('username', username)) {
      return CreateResponse.error(RegisterError.USERNAME_EXISTS)
    }
    if (await User.query().findOne('email', email)) {
      return CreateResponse.error(RegisterError.EMAIL_EXISTS)
    }
    const { id } = await User.query().insert({
      username,
      displayName,
      email,
      password: await this.cryptService.hash(password),
    })
    return CreateResponse.data({ userId: id })
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginUserResponseDto> {
    const { username, password } = loginUserDto
    const user = await User.query().findOne('username', username)

    if (!user) {
      return CreateResponse.error(LoginError.WRONG_USERNAME)
    }
    if (!(await this.cryptService.compare(password, user.password))) {
      return CreateResponse.error(LoginError.WRONG_PASSWORD)
    }
    return CreateResponse.data({ userId: user.id })
  }

  findAll() {
    return `This action returns all user`
  }

  async findOne(id: number) {
    return User.query().findById(id)
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
