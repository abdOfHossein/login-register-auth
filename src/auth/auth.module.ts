import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { User } from '../user/entities/user.entity'; 
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

const config = require('dotenv').config(join(__dirname, '../../.env'));
const secret = process.env.JWT_SECRET_KEY;

@Module({
  imports: [
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
