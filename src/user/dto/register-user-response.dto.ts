import { ResponseDto } from 'src/common/types/response.dto'

export enum RegisterError {
  USERNAME_EXISTS = 'USERNAME_EXISTS',
  EMAIL_EXISTS = 'EMAIL_EXISTS',
}

export type RegisterUserResponseDto = ResponseDto<{ userId: number }, RegisterError>
