import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,

    private dataSource: DataSource,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      console.log(createUserDto);
      
      const user = await this.dataSource.manager
        .createQueryBuilder(User, 'user')
        .insert()
        .into(User)
        .values(createUserDto)
        .execute();
      console.log(user);
      // const user = await this.userRepo.create();
      // user.firstName = createUserDto.firstName;
      // await this.userRepo.save(user);
      return 'user created successfully';
    } catch (e) {
      console.log(e);
      
      throw e;
    }
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
