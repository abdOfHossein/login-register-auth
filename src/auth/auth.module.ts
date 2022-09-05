import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { EmailModule } from '../email/email.module';
import { RedisModule } from '../redis/redis.module';
import { SmsModule } from '../sms/sms.module';
import { User } from '../user/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { LocalStrategy } from './jwt/local.strategy';

const config = require('dotenv').config(join(__dirname, '../../.env'));
const secret = process.env.JWT_SECRET_KEY;

@Module({
  imports: [
    RedisModule.forRoot('127.0.0.1'),
    SmsModule,
    EmailModule,
    PassportModule,
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '360s' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
