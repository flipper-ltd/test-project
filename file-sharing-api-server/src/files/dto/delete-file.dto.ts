import { ApiProperty } from '@nestjs/swagger';

export class DeleteFileDto {
  @ApiProperty()
  privateKey: string;
}
