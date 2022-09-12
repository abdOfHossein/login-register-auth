import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonTypeOrmModuleOptions } from '../database/common-typeorm';
import { AppConfigService } from './app-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(CommonTypeOrmModuleOptions),
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
