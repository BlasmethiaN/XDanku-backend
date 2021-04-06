import { IsNotEmpty } from 'class-validator'

export class CreateContributionDto {
  @IsNotEmpty()
  title: string
  description: string
  tags: string[]
  original: boolean = false
}
