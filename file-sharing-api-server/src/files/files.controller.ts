import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Get,
  ForbiddenException,
} from '@nestjs/common';
import { Express } from 'express';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { DeleteFileDto } from './dto/delete-file.dto';
import { unlink } from 'fs';
import { FileElement } from './schemas/file.schema';
import { GetFileDto } from './dto/get-file.dto';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get()
  @ApiOperation({ summary: 'GET all files' })
  findAll(): Promise<FileElement[]> {
    return this.filesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Upload files' })
  @UseInterceptors(FilesInterceptor('files', 5))
  uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: CreateFileDto, // eslint-disable-line
  ) {
    const createFileDto = { files };
    return this.filesService.create(createFileDto);
  }

  @Get(':publicKey')
  @ApiOperation({ summary: 'GET all files' })
  findByKey(@Param() { publicKey }: GetFileDto): Promise<FileElement> {
    return this.filesService.findByKey(publicKey);
  }

  @Delete(':privateKey')
  @ApiOperation({ summary: 'Delete file with the path' })
  async deleteFile(@Param() { privateKey }: DeleteFileDto) {
    try {
      const file = await this.filesService.findByKey(privateKey);
      if (privateKey === file.privateKey) {
        await this.deleteFileFromDisk(file.path);
        return this.filesService.remove(file);
      }
      return new ForbiddenException('Access Denied');
    } catch (error) {
      throw new ForbiddenException('Access Denied');
    }
  }

  deleteFileFromDisk(path: string) {
    return new Promise((resolve, reject) => {
      unlink(path, (err) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(true);
        }
      });
    });
  }
}
