import { Controller, Get, Post, Body, Res, Req, Param } from '@nestjs/common'
import { LoginUserDto } from './dto/login-user.dto'
import { RegisterUserDto } from './dto/register-user.dto'
import { UserService } from './user.service'
import { Request, Response } from 'express'
import { AuthService } from 'src/auth/auth.service'
import { ContributionService } from 'src/contribution/contribution.service'
import { ClassSerializerInterceptor } from '@nestjs/common/serializer/class-serializer.interceptor'
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator'
import { LibService } from 'src/common/lib/lib.service'

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(
    private readonly contributionService: ContributionService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly libService: LibService
  ) {}

  private setTokenCookie(userId: number, res: Response) {
    res.cookie('token', `Bearer ${this.authService.sign({ userId })}`, {
      httpOnly: true,
      secure: this.libService.isProduction(),
      sameSite: this.libService.isProduction() ? 'none' : undefined,
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
    })
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

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token')
    return true
  }

  @Get()
  async currentUser(@Req() req: Request) {
    if (req.userId == null) return null
    return await this.userService.findOne(req.userId)
  }

  @Get('contributions')
  async contributions(@Req() req: Request) {
    return this.contributionService.findByUser(req.userId)
  }

  @Get(':id')
  async info(@Param('id') userId: number) {
    return await this.userService.info(userId)
  }
}
