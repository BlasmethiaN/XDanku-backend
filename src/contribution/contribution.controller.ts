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
} from '@nestjs/common'
import { ContributionService } from './contribution.service'
import { CreateContributionDto } from './dto/create-contribution.dto'
import { UpdateContributionDto } from './dto/update-contribution.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { v4 as uuidv4 } from 'uuid'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import * as fs from 'fs'

export const multerConfig: MulterOptions = {
  storage: diskStorage({
    destination: `./uploads/temp/`,
    filename: (req, file, cb) => {
      fs.mkdir(`./uploads/temp/${req.query.tempId as string}`, { recursive: true }, function (err) {
        if (err) {
          console.log(err)
        } else {
          const fileName: string = uuidv4()
          const fileExt: string = file.originalname
          cb(null, `${req.query.tempId as string}/${fileName}${fileExt}`)
        }
      })
    },
  }),
  fileFilter: (req, file, callback) => {
    if (!/\.(jpg|jpeg|png|gif)$/.test(file.originalname)) {
      return callback(new Error('Only image files are allowed!'), false)
    }
    callback(null, true)
  },
}

@Controller('contribution')
export class ContributionController {
  constructor(private readonly contributionService: ContributionService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    // const user: User = req.user.user
    return { imagePath: file.path }
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
function JwtAuthGuard(JwtAuthGuard: any) {
  throw new Error('Function not implemented.')
}
