import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user: any = await this.userRepository.findOne({
        where: { username: username },
      });

      if (user && user.password == password) {
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
    console.log(user);
    const payload = { id: user.id, sub: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
