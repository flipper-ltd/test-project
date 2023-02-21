import { ApiProperty } from '@nestjs/swagger';

export class CreateSettingDto {
  @ApiProperty()
  downloadLimit: number;

  @ApiProperty()
  uploadLimit: number;
}
