import { BadRequestException, Injectable } from '@nestjs/common';
import { PatternSmsEnum } from '../enums/pattern.sms.enum';
import { SmsUtility } from './utility/sms.utility';

import { CreateLogSmsDto } from '../../history/dtos/create.log.sms.dto';
import { HistoryService } from '../../history/service/history.service';
import { RedisService } from '../../redis/redis.service';
import { SmsEnum } from '../enums/sms.enum';

const randomstring = require('randomstring');

@Injectable()
export class SmsService {
  private REDIS_PREFIX_PREPARE_REGISTER: string = 'prepare_register_mobile';
  private REDIS_PREFIX_PREPARE_LOGIN: string = 'prepare_login_mobile';
  private REDIS_PREFIX_PREPARE_FORGET: string = 'prepare_login_forget';

  constructor(
    private historyService: HistoryService,
    private redisService: RedisService,
  ) {}

  async sendSmsPrepareRegister(mobile: string) {
    try {
      const randomCode = randomstring.generate({
        length: 6,
        charset: '1234567890',
      });
      const inputData = [{ 'verification-code': randomCode }];
      const resultSms = await SmsUtility.sendSmsIr(
        mobile,
        PatternSmsEnum.PATTERN_REGISTER,
        inputData,
      );
      const createLogSmsDto: CreateLogSmsDto = {
        code: randomCode,
        mobile: mobile,
        serial: resultSms,
        hash_code: randomstring.generate({
          length: 128,
          charset:
            '123456789012345678901234567890qwertyuioplkjhgfdsaQWERTYUIOPLKJHGFDSACVXZMNB',
        }),
      };
      await this.historyService.createLog(createLogSmsDto);
      await this.redisService.setKey(
        `${this.REDIS_PREFIX_PREPARE_REGISTER}${createLogSmsDto.hash_code}${mobile}`,
        JSON.stringify(createLogSmsDto),
        3600,
      );
      console.log(createLogSmsDto.hash_code);
      return createLogSmsDto.hash_code;
    } catch (err) {
      if (err.constructor.name == 'BadRequestException') {
        const error: BadRequestException = err;
        throw new BadRequestException(error.getResponse());
      }
    }
  }

  async sendSmsPrepareLogin(mobile: string, userId: string) {
    try {
      const randomCode = randomstring.generate({
        length: 6,
        charset: '1234567890',
      });
      const inputData = [{ 'verification-code': randomCode }];
      const resultSms = await SmsUtility.sendSmsIr(
        mobile,
        PatternSmsEnum.PATTERN_REGISTER,
        inputData,
      );
      const createLogSmsDto: CreateLogSmsDto = {
        code: randomCode,
        mobile: mobile,
        serial: resultSms,
        hash_code: randomstring.generate({
          length: 128,
          charset:
            '123456789012345678901234567890qwertyuioplkjhgfdsaQWERTYUIOPLKJHGFDSACVXZMNB',
        }),
        user: userId,
      };
      await this.historyService.createLog(createLogSmsDto);
      await this.redisService.setKey(
        `${this.REDIS_PREFIX_PREPARE_LOGIN}${createLogSmsDto.hash_code}${mobile}`,
        JSON.stringify(createLogSmsDto),
        3600,
      );
      return createLogSmsDto.hash_code;
    } catch (err) {
      console.log(err);
      const error: BadRequestException = err;
      throw new BadRequestException(error.getResponse());
    }
  }

  async sendSmsPrepareForget(mobile: string) {
    try {
      const randomCode = randomstring.generate({
        length: 6,
        charset: '1234567890',
      });
      const inputData = [{ 'verification-code': randomCode }];
      const resultSms = await SmsUtility.sendSmsIr(
        mobile,
        PatternSmsEnum.PATTERN_FORGET,
        inputData,
      );
      const createLogSmsDto: CreateLogSmsDto = {
        code: randomCode,
        mobile: mobile,
        serial: resultSms,
        hash_code: randomstring.generate({
          length: 128,
          charset:
            '123456789012345678901234567890qwertyuioplkjhgfdsaQWERTYUIOPLKJHGFDSACVXZMNB',
        }),
      };
      await this.historyService.createLog(createLogSmsDto);
      await this.redisService.setKey(
        `${this.REDIS_PREFIX_PREPARE_FORGET}${createLogSmsDto.hash_code}${mobile}`,
        JSON.stringify(createLogSmsDto),
        3600,
      );
      return createLogSmsDto.hash_code;
    } catch (e) {
      console.log(e);
    }
  }

  async checkSmsPreRegisterUser(
    hash_code: string,
    mobile: string,
    code: string,
  ) {
    console.log(hash_code);
    const result = await this.redisService.getKey(
      `${this.REDIS_PREFIX_PREPARE_REGISTER}${hash_code}${mobile}`,
    );
    if (result != null) {
      if (result.code != code) {
        throw new Error(
          `${JSON.stringify({
            section: 'sms',
            value: SmsEnum.SMS_CODE_NOT_AVAILABLE,
          })}`,
        );
      }
      return true;
    } else {
      throw new Error(
        `${JSON.stringify({
          section: 'sms',
          value: SmsEnum.SMS_CODE_NOT_AVAILABLE,
        })}`,
      );
    }
  }

  async checkSmsPreLoginUser(
    hash_code: string,
    mobile: string,
    code: string,
  ): Promise<string> {
    const result = await this.redisService.getKey(
      `${this.REDIS_PREFIX_PREPARE_LOGIN}${hash_code}${mobile}`,
    );
    if (result != null) {
      if (result.code != code) {
        throw new Error(
          `${JSON.stringify({
            section: 'sms',
            value: SmsEnum.SMS_CODE_NOT_AVAILABLE,
          })}`,
        );
      }
      return result.user;
    } else {
      throw new Error(
        `${JSON.stringify({
          section: 'sms',
          value: SmsEnum.SMS_CODE_NOT_AVAILABLE,
        })}`,
      );
    }
  }
}
