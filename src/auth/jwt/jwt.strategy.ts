import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { join } from 'path';
import { User } from '../../user/entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService:ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: any) {
    try {
     
      const user = await this.userRepository.findOne({
        where: { username: payload.username },
      });
      return {
        username: payload.username,
        password: payload.sub,
      };
    } catch (error) {
      throw error;
    }
  }
}
