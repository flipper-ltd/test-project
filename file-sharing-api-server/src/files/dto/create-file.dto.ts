import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto {
  @ApiProperty()
  files: File[];
}