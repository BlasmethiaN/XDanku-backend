export enum RegisterError {
  PASSWORDS_DONT_MATCH = 'PASSWORDS_DONT_MATCH',
  USERNAME_EXISTS = 'USERNAME_EXISTS',
  EMAIL_EXISTS = 'EMAIL_EXISTS',
}

export type RegisterUserResponseDto = { userId: number } | RegisterError
