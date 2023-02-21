import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateSettingDto {
  @ApiProperty()
  @IsNumber()
  downloadLimit: number;

  @ApiProperty()
  @IsNumber()
  uploadLimit: number;
}
