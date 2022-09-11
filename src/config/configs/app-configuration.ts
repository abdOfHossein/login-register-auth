import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: +configService.get<number>('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
      entities: ['dist/**/*.entity.js', '**/*.entity.js'],
      // synchronize: true,
      // logging:true
    };
  }
}
