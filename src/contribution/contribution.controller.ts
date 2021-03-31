import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common'
import { ContributionService } from './contribution.service'
import { CreateContributionDto } from './dto/create-contribution.dto'
import { UpdateContributionDto } from './dto/update-contribution.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { v4 as uuidv4 } from 'uuid'

export const storage = {
  storage: diskStorage({
    destination: `./uploads/temp/`,
    filename: (req, file, cb) => {
      const fileName: string = uuidv4()
      const fileExt: string = file.originalname

      cb(null, `${fileName}${fileExt}`)
    },
  }),
}

@Controller('contribution')
export class ContributionController {
  constructor(private readonly contributionService: ContributionService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', storage))
  uploadImage(@UploadedFiles() file: Express.Multer.File) {
    return of({ imagePath: file.path })
  }

  @Post()
  create(@Body() createContributionDto: CreateContributionDto) {
    return this.contributionService.create(createContributionDto)
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
function of(arg0: { imagePath: string }) {
  throw new Error('Function not implemented.')
}
