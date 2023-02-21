import { Inject, Injectable } from '@nestjs/common';
import { JsonDB } from 'node-json-db';
import { CreateSettingDto } from './dto/create-setting.dto';
import { Setting } from './schemas/setting.schema';

@Injectable()
export class SettingsService {
  constructor(@Inject('DATABASE_CONNECTION') private db: JsonDB) {}

  async create(createSettingDto: CreateSettingDto): Promise<Setting> {
    await this.db.push('/settings', createSettingDto);
    return this.db.getData('/settings');
  }

  findAll(): Promise<Setting> {
    return this.db.getData('/settings');
  }

  removeAll(): Promise<void> {
    return this.db.delete('/settings');
  }
}
