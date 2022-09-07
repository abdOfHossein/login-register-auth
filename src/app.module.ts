import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonTypeOrmModuleOptions } from './config/database/common.pg';
import { EmailModule } from './email/email.module';
import { GroupModule } from './packages/group/group.module';
import { PckgModule } from './packages/pckg.module';
import { ProdPackgVModule } from './packages/prod-packg-v.module';
import { ProductModule } from './packages/modules/product.module';
import { PckgVersionModule } from './packages/pckg-version.module';
import { ProfileModule } from './profile/profile.module';
import { RedisModule } from './redis/redis.module';
import { SmsModule } from './sms/sms.module';
import { UserModule } from './user/user.module';
import { PackagesModule } from './packages/packages.module';

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
    PackagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
