import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@ValidatorConstraint({ name: 'isUniqueUserName', async: true })
@Injectable()
export class UserNameExistsRule implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private dataSource: DataSource) {}

  async validate(value: string) {
    try {
      console.log(value);

      const user = await this.dataSource.manager

        .createQueryBuilder(User, 'user')
        .where('user.username = :username', { username: value })
        .getOne();
      console.log(user);

      if (user) {
        return false;
      }
      return true;
    } catch (e) {
      throw e
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `username already exist`;
  }
}
