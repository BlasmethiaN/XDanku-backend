export enum LoginError {
  WRONG_USERNAME = 'WRONG_USERNAME',
  WRONG_PASSWORD = 'WRONG_PASSWORD',
}

export type LoginUserResponseDto = { userId: number } | { error: LoginError }
