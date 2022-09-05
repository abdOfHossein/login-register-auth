import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreatePckgVersionDto } from './dto/create-pckg-version.dto';
import { UpdatePckgVersionDto } from './dto/update-pckg-version.dto';
import { PckgVersion } from './entities/pckg-version.entity';

@Injectable()
export class PckgVersionService {
  constructor(
    @InjectRepository(PckgVersion) private pckgVersionRepo: Repository<PckgVersion>,

    private dataSource: DataSource,
  ) {}

 async create(createPckgVersionDto: CreatePckgVersionDto) {
    const pckgVersion = await this.dataSource.manager
      .createQueryBuilder(PckgVersion, 'pkgVersion')
      .insert()
      .into(PckgVersion)
      .values(createPckgVersionDto)
      .execute()
    console.log(pckgVersion);
    return pckgVersion;
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
