import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions
} from '@nestjs/typeorm';
import TypeOrmConfig from '../configs/app-configuration';
const defaultDatabaseOptions = {
  // logger: new DatabaseLogger(),
  synchronize: process.env.DB_SYNCHRONIZE === 'true' || false,
  migrationsTableName: 'migrations',
};

export const CommonTypeOrmModuleOptions: TypeOrmModuleAsyncOptions = {
  ...defaultDatabaseOptions,
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};

