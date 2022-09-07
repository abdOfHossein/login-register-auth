import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { ProPckgVerRlEntity } from '../prod-packg-v/entities/prod-packg-v.entity';
import { VersionEntity } from '../version/entities/version.entity';
import { CreatePckgVersionDto } from './dto/create-pckg-version.dto';
import { FindPckgVersionDto } from './dto/find.pckg-version.dto';
import { FindProdPckgVersionDto } from './dto/find.prod-pckg-ver.dto';
import { PckgVerRlEntity } from './entities/pckg-version.entity';

@Injectable()
export class PckgVersionService {
  constructor(
    @InjectRepository(PckgVerRlEntity)
    private pckgVerRlRepo: Repository<PckgVerRlEntity>,
    private dataSource: DataSource,
  ) {}

  async create(
    createPckgVersionDto: CreatePckgVersionDto,
    findProdPckgVersionDto: FindProdPckgVersionDto,
    query?: QueryRunner,
  ) {
    try {
      const prod_pckg_ver_rl = await this.dataSource.manager
        .createQueryBuilder(ProPckgVerRlEntity, 'proPckgVerRlEntity')
        .where('proPckgVerRlEntity.id= :id', {
          id: findProdPckgVersionDto.prod_pckg_ver_rl_id,
        })
        .getOne();

      const pckgVerRlEntity = new PckgVerRlEntity();
      pckgVerRlEntity.status = createPckgVersionDto.status;
      pckgVerRlEntity.price = createPckgVersionDto.price;
      pckgVerRlEntity.point = createPckgVersionDto.point;
      pckgVerRlEntity.wage_custom_fee = createPckgVersionDto.wage_custom_fee;
      pckgVerRlEntity.personal_price = createPckgVersionDto.personal_price;
      pckgVerRlEntity.group_price = createPckgVersionDto.group_price;
      pckgVerRlEntity.commission = createPckgVersionDto.commission;
      pckgVerRlEntity.prod_pckg_ver_rl = [prod_pckg_ver_rl];

      const version = this.dataSource.manager.create(VersionEntity);
      version.pckg_version = [pckgVerRlEntity];
      await this.dataSource.manager.save(version);

      if (query) return await query.manager.save(pckgVerRlEntity);
      return await this.dataSource.manager.save(pckgVerRlEntity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  findAll() {
    return `This action returns all pckg`;
  }

  async findOne(
    findPckgDto: FindPckgVersionDto,
    options?: Record<string, any>,
  ): Promise<CreatePckgVersionDto> {
    try {
      return await this.dataSource.manager
        .createQueryBuilder(PckgVerRlEntity, 'pckgVerRlEntity')
        .where('pckgVerRlEntity.id = :id', { id: findPckgDto.pckg_version_id })
        .getOne();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async update(
    pckgVerRlEntity: PckgVerRlEntity,
    createPckgVersionDto: CreatePckgVersionDto,
    query?: QueryRunner,
  ) {
    try {
      pckgVerRlEntity.link = createPckgVersionDto.link;
      pckgVerRlEntity.commission = createPckgVersionDto.commission;
      pckgVerRlEntity.group_price = createPckgVersionDto.group_price;
      pckgVerRlEntity.personal_price = createPckgVersionDto.personal_price;
      pckgVerRlEntity.point = createPckgVersionDto.point;
      pckgVerRlEntity.price = createPckgVersionDto.price;
      pckgVerRlEntity.status = createPckgVersionDto.status;
      pckgVerRlEntity.wage_custom_fee = createPckgVersionDto.wage_custom_fee;
      if (query) return await query.manager.save(pckgVerRlEntity);
      return await this.dataSource.manager.save(pckgVerRlEntity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async delete(
    pckgVerRlEntity: PckgVerRlEntity,
    query?: QueryRunner,
  ): Promise<CreatePckgVersionDto> {
    try {
      if (query) return await query.manager.remove(pckgVerRlEntity);
      return await this.dataSource.manager.remove(pckgVerRlEntity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
