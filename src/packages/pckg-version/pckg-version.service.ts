import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreatePckgVersionDto } from './dto/create-pckg-version.dto';
import { UpdatePckgVersionDto } from './dto/update-pckg-version.dto';
import { PckgVerRlEntity } from './entities/pckg-version.entity';

@Injectable()
export class PckgVersionService {
  constructor(
    @InjectRepository(PckgVerRlEntity)
    private pckgVerRlRepo: Repository<PckgVerRlEntity>,
    private dataSource: DataSource,
  ) {}
  link: string;

  async create(createPckgVersionDto: CreatePckgVersionDto) {
    try {
      const pckgVerRlEntity = new PckgVerRlEntity();
      pckgVerRlEntity.status = createPckgVersionDto.status;
      pckgVerRlEntity.price = createPckgVersionDto.price;
      pckgVerRlEntity.point = createPckgVersionDto.point;
      pckgVerRlEntity.wage_custom_fee = createPckgVersionDto.wage_custom_fee;
      pckgVerRlEntity.personal_price = createPckgVersionDto.personal_price;
      pckgVerRlEntity.group_price = createPckgVersionDto.group_price;
      pckgVerRlEntity.commission = createPckgVersionDto.commission;
      await this.dataSource.manager.save(pckgVerRlEntity);
      console.log(pckgVerRlEntity);
      return pckgVerRlEntity;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  findAll() {
    return `This action returns all pckgVersion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pckgVersion`;
  }

  update(id: number, updatePckgVersionDto: UpdatePckgVersionDto) {
    return `This action updates a #${id} pckgVersion`;
  }

  remove(id: number) {
    return `This action removes a #${id} pckgVersion`;
  }
}
