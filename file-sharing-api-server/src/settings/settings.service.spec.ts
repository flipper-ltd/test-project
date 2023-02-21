import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database/database.module';
import { Setting } from './schemas/setting.schema';
import { SettingsService } from './settings.service';

const mockSetting: Setting = {
  downloadLimit: 5,
  uploadLimit: 5,
};

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [SettingsService],
    }).compile();

    service = module.get<SettingsService>(SettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('CRUD setting', () => {
    beforeEach(async () => {
      await service.removeAll();
    });

    it('should create setting', async () => {
      const setting = await service.create(mockSetting);
      expect(setting).toBe(mockSetting);
    });

    it('should get setting', async () => {
      await service.create(mockSetting);
      const data = await service.findAll();
      expect(data).toStrictEqual(mockSetting);
    });

    it('should remove all setting', async () => {
      await service.create(mockSetting);
      const data = await service.removeAll();
      expect(data).toBeUndefined();
    });
  });
});
