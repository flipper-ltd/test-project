import { Test, TestingModule } from '@nestjs/testing';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';

const mockSettingsService = () => ({
  create: jest.fn((x) => x),
  findAll: jest.fn((x) => x),
});

describe('SettingsController', () => {
  let controller: SettingsController;
  let settingsService: SettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SettingsController],
      providers: [
        {
          provide: SettingsService,
          useFactory: mockSettingsService,
        },
      ],
    }).compile();

    controller = module.get<SettingsController>(SettingsController);
    settingsService = module.get<SettingsService>(SettingsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all settings', async () => {
      const result = {
        downloadLimit: 5,
        uploadLimit: 5,
      };
      jest
        .spyOn(settingsService, 'findAll')
        .mockImplementation(async () => result);

      expect(await settingsService.findAll()).toBe(result);
    });
  });

  describe('Create', () => {
    it('should create setting', async () => {
      const result = {
        downloadLimit: 5,
        uploadLimit: 5,
      };
      jest
        .spyOn(settingsService, 'create')
        .mockImplementation(async () => result);

      expect(await settingsService.create(result)).toBe(result);
    });
  });
});
