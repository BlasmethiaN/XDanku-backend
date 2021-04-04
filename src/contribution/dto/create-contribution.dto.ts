import { IsNotEmpty } from 'class-validator'

export class CreateContributionDto {
  @IsNotEmpty()
  title: string
  description: string
  @IsNotEmpty()
  added_time: string
  @IsNotEmpty()
  author: number
  original: boolean = false
}
