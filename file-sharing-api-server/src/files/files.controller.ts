import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { Express } from 'express';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { DeleteFileDto } from './dto/delete-file.dto';
import { unlink } from 'fs';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('uploads')
  @ApiOperation({ summary: 'Upload files' })
  @UseInterceptors(FilesInterceptor('files', 5))
  uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: CreateFileDto,
  ) {
    console.log('body: ', body);
    console.log('files: ', files);
    return files;
  }

  @Delete(':path')
  @ApiOperation({ summary: 'Delete file with the path' })
  deleteFile(@Param() { path }: DeleteFileDto) {
    return new Promise((resolve, reject) => {
      const filepath = `./public/${path}`;
      unlink(filepath, function (err) {
        if (err) return reject(err);
        else return resolve(true);
      });
    });
  }
}
