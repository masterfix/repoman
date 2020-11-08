import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { AppService } from './app.service';
import { RepoService } from './repo/repo.service';

@Controller()
export class AppController {
  constructor(private readonly repoService: RepoService) {}

  @Post('add')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({}),
      fileFilter: (_req, file, cb) => {
        cb(null, file.originalname.endsWith('.pkg.tar.xz'));
      },
    }),
  )
  addPackage(@UploadedFile() file): string {
    if (!file) {
      throw new BadRequestException('invalid file given');
    }
    return this.repoService.addPackage(file);
  }

  @Post('remove')
  removePackage(@Body('pkg') pkgName: string): string {
    return this.repoService.removePackage(pkgName);
  }
}
