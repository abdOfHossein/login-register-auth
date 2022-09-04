import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonTypeOrmModuleOptions } from './config/database/common.pg';
import { ProfileModule } from './profile/profile.module';
import { RedisModule } from './redis/redis.module';
import { UserModule } from './user/user.module';
import { TwilioModule } from 'nestjs-twilio';
import { SmsModule } from './sms/sms.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(CommonTypeOrmModuleOptions),
   
    UserModule,
    AuthModule,
    ProfileModule,
    RedisModule.forRoot('127.0.0.1'),
    SmsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
