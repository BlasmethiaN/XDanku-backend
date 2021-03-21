import { Controller, Get, Post, Body, Res, Req } from '@nestjs/common'
import { LoginUserDto } from './dto/login-user.dto'
import { RegisterUserDto } from './dto/register-user.dto'
import { UserService } from './user.service'
import { Request, Response } from 'express'
import { AuthService } from 'src/auth/auth.service'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  private setTokenCookie(userId: number, res: Response) {
    res.cookie('token', `Bearer ${this.authService.sign({ userId })}`, { httpOnly: true })
  }

  @Post('register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const response = await this.userService.register(registerUserDto)
    if (response.type == 'data') {
      this.setTokenCookie(response.data.userId, res)
    }
    return response
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
    const response = await this.userService.login(loginUserDto)
    if (response.type == 'data') {
      this.setTokenCookie(response.data.userId, res)
    }
    return response
  }

  @Get()
  async currentUser(@Req() req: Request) {
    return (await this.userService.findOne(req.userId)).withoutPassword
  }
}
