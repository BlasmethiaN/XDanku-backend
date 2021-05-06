import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common'
import { ContributionService } from './contribution.service'
import { CreateContributionDto } from './dto/create-contribution.dto'
import { UpdateContributionDto } from './dto/update-contribution.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { Request } from 'express'

@Controller('contribution')
export class ContributionController {
  constructor(private readonly contributionService: ContributionService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return { imagePath: file.path }
  }

  @Get('new-draft')
  async createDraft(@Req() req: Request) {
    return await this.contributionService.createDraft(req.userId)
  }

  @Get('draftActivity/:id')
  async updateDraftActivity(@Param('id') id: number, @Req() req: Request) {
    return await this.contributionService.updateDraftActivity(id, req.userId)
  }

  @Delete('delete/:id')
  deleteContribution(@Param('id') id: number, @Req() req: Request) {
    return this.contributionService.deleteContribution(id, req.userId)
  }

  @Delete('draft/:id')
  deleteDraft(@Param('id') id: string, @Req() req: Request) {
    return this.contributionService.deleteDraft(id, req.userId)
  }

  @Delete('image/:draftId/:imageId')
  deleteImage(
    @Param('draftId') draftId: string,
    @Param('imageId') imageId: string,
    @Req() req: Request
  ) {
    return this.contributionService.deleteImage(draftId, imageId, req.userId)
  }

  @Post('create-contribution/:draftId')
  create(
    @Body() createContributionDto: CreateContributionDto,
    @Param('draftId') draftId: string,
    @Req() req: Request
  ) {
    return this.contributionService.createContribution(createContributionDto, req.userId, draftId)
  }

  @Get()
  findAll() {
    return this.contributionService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contributionService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContributionDto: UpdateContributionDto) {
    return this.contributionService.update(+id, updateContributionDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contributionService.remove(+id)
  }
}
