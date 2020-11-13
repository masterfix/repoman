import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { RepoService } from './repo/repo.service';

@Controller()
export class AppController {
  constructor(private readonly repoService: RepoService) {}

  @Post('add')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({}),
      fileFilter: (_req, file, cb) => {
        cb(null, file.originalname.endsWith('.pkg.tar.gz'));
      },
    }),
  )
  addPackage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ stdout: string; stderr: string }> {
    if (!file) {
      throw new BadRequestException('invalid file given');
    }
    return this.repoService.addPackage(file.path, file.originalname);
  }

  @Post('remove')
  removePackage(
    @Body('pkg') pkgName: string,
  ): Promise<{ stdout: string; stderr: string }> {
    return this.repoService.removePackage(pkgName);
  }
}
