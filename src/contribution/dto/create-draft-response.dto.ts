import { ResponseDto } from 'src/common/types/response.dto'
export enum ContributionError {
  ERROR = 'ERROR',
}

export type CreateDraftResponseDto = ResponseDto<{ draftId: string }, ContributionError>
