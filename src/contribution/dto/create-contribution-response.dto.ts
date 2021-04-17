import { ResponseDto } from 'src/common/types/response.dto'

export enum ContributionError {
  NO_IMAGE = 'NO_IMAGE',
}

export type CreateContributionResponseDto = ResponseDto<
  { contributionId: number },
  ContributionError
>
