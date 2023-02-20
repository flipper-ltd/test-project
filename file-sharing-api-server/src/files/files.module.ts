import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { createId } from '@paralleldrive/cuid2';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: `public/${configService.get<string>('FOLDER')}`,
        storage: diskStorage({
          destination: `./public/${configService.get<string>('FOLDER')}`,
          filename: (req, file, cb) =>
            cb(null, `${createId()}__${file.originalname}`),
        }),
        limits: {
          files: 5,
          fileSize: 5242880, // 5MB
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
