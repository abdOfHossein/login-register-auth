import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonTypeOrmModuleOptions } from './config/database/common.pg';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(CommonTypeOrmModuleOptions),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   port: 5432,
    //   username: 'postgres',
    //   password: '774936188',
    //   database: 'postgres',
    //   entities: [__dirname + '/user/entities/*.entity.js'],
    //   synchronize: true,
    // }),
    UserModule,
    AuthModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
