import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisService } from '../redis/redis.service';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor( 
    private redisService: RedisService,
    @InjectRepository(User)
    private userRepository:Repository<User>,
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {}

  async validateUser(id: string, username: string): Promise<any> {
    try {
      const user: any = await this.userRepository.findBy({
        username,
      });

      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async login(userInfo: any) {
    const user = await this.dataSource.manager
      .createQueryBuilder(User, 'user')
      .where('user.username = :username', { username: userInfo.username })
      .getOne();
    const payload = { id: user.id, sub: user.username };
    const access_token = this.jwtService.sign(payload);
    this.redisService.setKey('jwtToken', access_token, 180);
    return {
      access_token,
    };
  }
}
