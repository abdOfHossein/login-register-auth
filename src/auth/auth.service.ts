import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from '../email/email.service';
import { DataSource, Repository } from 'typeorm';
import { RedisService } from '../redis/redis.service';
import { SmsService } from '../sms/service/sms.service';
import { User } from '../user/entities/user.entity';
import { EmailDto } from './dto/email.dto';
import { MobileDto } from './dto/mobile.dto';

@Injectable()
export class AuthService {
  constructor(
    private redisService: RedisService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private dataSource: DataSource,
    private jwtService: JwtService,
    private smsService: SmsService,
    private emailService: EmailService,
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

  async forgetPassSendMobile(mobileDto: MobileDto) {
    try {
      return await this.smsService.sendSmsPrepareForget(mobileDto.mobile);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  // async forgetPassSendEmail(emailDto: EmailDto) {
  //   try {
  //     return this.emailService.sendPassToEmail(emailDto.email);
  //   } catch (e) {
  //     console.log('here');
  //     console.log(e);
  //     throw e;
  //   }
  // }
}
