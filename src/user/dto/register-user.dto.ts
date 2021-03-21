import { IsNotEmpty, MaxLength } from 'class-validator'

export class RegisterUserDto {
  @IsNotEmpty()
  username: string
  @IsNotEmpty()
  @MaxLength(20)
  displayName: string
  @IsNotEmpty()
  email: string
  @IsNotEmpty()
  password: string
}
