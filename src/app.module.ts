import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonTypeOrmModuleOptions } from './config/database/common.pg';
import { EmailModule } from './email/email.module';
import { PackagesModule } from './packages/packages.module';
import { ProfileModule } from './profile/profile.module';
import { RedisModule } from './redis/redis.module';
import { SmsModule } from './sms/sms.module';
import { UserModule } from './user/user.module';



@Module({
  imports: [
    // TypeOrmModule.forRoot(CommonTypeOrmModuleOptions),
    ConfigModule.forRoot({ envFilePath: join(process.cwd(), '.env.debug'),isGlobal:true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    PackagesModule,
    UserModule,
    AuthModule,
    ProfileModule,
    RedisModule.forRoot('127.0.0.1'),
    SmsModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
