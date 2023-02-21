import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { FilesModule } from './files/files.module';
import { DatabaseModule } from './database/database.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
    }),
    FilesModule,
    DatabaseModule,
    SettingsModule,
  ],
})
export class AppModule {}
