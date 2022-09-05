import { Injectable } from '@nestjs/common';
import { CreatePckgDto } from './dto/create-pckg.dto';
import { UpdatePckgDto } from './dto/update-pckg.dto';

@Injectable()
export class PckgService {
  create(createPckgDto: CreatePckgDto) {
    return 'This action adds a new pckg';
  }

  findAll() {
    return `This action returns all pckg`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pckg`;
  }

  update(id: number, updatePckgDto: UpdatePckgDto) {
    return `This action updates a #${id} pckg`;
  }

  remove(id: number) {
    return `This action removes a #${id} pckg`;
  }
}
