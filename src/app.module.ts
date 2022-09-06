import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonTypeOrmModuleOptions } from './config/database/common.pg';
import { EmailModule } from './email/email.module';
import { GroupModule } from './packages/group/group.module';
import { PckgVersionModule } from './packages/pckg-version/pckg-version.module';
import { PckgModule } from './packages/pckg/pckg.module';
import { ProdPackgVModule } from './packages/prod-packg-v/prod-packg-v.module';
import { ProductModule } from './packages/product/product.module';
import { VersionModule } from './packages/version/version.module';
import { ProfileModule } from './profile/profile.module';
import { RedisModule } from './redis/redis.module';
import { SmsModule } from './sms/sms.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(CommonTypeOrmModuleOptions),
    UserModule,
    AuthModule,
    ProfileModule,
    RedisModule.forRoot('127.0.0.1'),
    SmsModule,
    EmailModule,
    ProductModule,
    PckgModule,
    PckgVersionModule,
    GroupModule,
    VersionModule,
    ProdPackgVModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
