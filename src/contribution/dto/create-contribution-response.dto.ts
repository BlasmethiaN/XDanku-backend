import { ResponseDto } from 'src/common/types/response.dto'

export enum ContributionError {}

export type CreateContributionResponseDto = ResponseDto<
  { contributionId: number },
  ContributionError
>
