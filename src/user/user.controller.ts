import { Controller, Get, Post, Body } from '@nestjs/common'
import { RegisterUserDto } from './dto/register-user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto)
  }

  @Get()
  currentUser() {
    return this.userService.findAll()
  }
}
