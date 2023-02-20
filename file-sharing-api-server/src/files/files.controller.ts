import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Get,
} from '@nestjs/common';
import { Express } from 'express';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { DeleteFileDto } from './dto/delete-file.dto';
import { unlink } from 'fs';
import { FileElement } from './schemas/file.schema';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get()
  @ApiOperation({ summary: 'GET all files' })
  findAll(): Promise<FileElement[]> {
    return this.filesService.findAll();
  }

  @Post('uploads')
  @ApiOperation({ summary: 'Upload files' })
  @UseInterceptors(FilesInterceptor('files', 5))
  uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: CreateFileDto, // eslint-disable-line
  ) {
    const data = {
      files: files.map((item) => ({
        ...item,
        privateKey: '',
        publicKey: '',
      })),
    };
    return this.filesService.create(data);
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
