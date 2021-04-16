import { ContributionController } from './contribution.controller'
import { ContributionService } from './contribution.service'
import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import _ from 'lodash'
import { diskStorage } from 'multer'
import fs from 'fs-extra'
import { UploadImageResponse } from './dto/upload-image-response.dto'

const multerConfig = async (contributionService: ContributionService): Promise<MulterOptions> => ({
  storage: diskStorage({
    destination: `./uploads/temp/`,
    filename: async (req, file, cb) => {
      const draftId = req.query.draftId as string
      await fs.mkdirp(`./uploads/temp/${draftId}`)
      const fileExt: string = _.last(file.originalname.split('.'))
      const fileName: string = await contributionService.createImage(draftId, req.userId, fileExt)
      cb(null, `${draftId}/${fileName}.${fileExt}`)
    },
  }),
  fileFilter: (req, file, callback) => {
    if (!/\.(jpg|jpeg|png|gif)$/.test(file.originalname)) {
      return callback(new Error(UploadImageResponse.NOT_IMAGE), false)
    }
    callback(null, true)
  },
})

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ContributionModule],
      useFactory: multerConfig,
      inject: [ContributionService],
    }),
  ],
  controllers: [ContributionController],
  providers: [ContributionService],
  exports: [ContributionService],
})
export class ContributionModule {}
