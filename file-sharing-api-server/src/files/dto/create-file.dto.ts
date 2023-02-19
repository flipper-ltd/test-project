import { ApiProperty } from '@nestjs/swagger';
import { Express } from 'express';

export class CreateFileDto {
  @ApiProperty()
  files: Array<Express.Multer.File>;
}
