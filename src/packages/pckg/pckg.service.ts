import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { PckgVerRlEntity } from '../pckg-version/entities/pckg-version.entity';
import { CreatePckgDto } from './dto/create-pckg.dto';
import { FindPckgDto } from './dto/find.pckg.dto';
import { PckgEntity } from './entities/pckg.entity';

@Injectable()
export class PckgService {
  constructor(
    @InjectRepository(PckgEntity)
    private ProductRepo: Repository<PckgEntity>,
    private dataSource: DataSource,
  ) {}

  async create(
    createPckgDto: CreatePckgDto,
    findPckgDto: FindPckgDto,
    query?: QueryRunner,
  ) {
    try {
      const pckg_version = await this.dataSource.manager
        .createQueryBuilder(PckgVerRlEntity, 'pckgVerRlEntity')
        .where('pckgVerRlEntity.id = :id', { id: findPckgDto.pckg_id })
        .getOne();

      const packageEntity = new PckgEntity();
      packageEntity.slug = createPckgDto.slug;
      packageEntity.image = createPckgDto.image;
      packageEntity.mobile_support = createPckgDto.mobile_support;
      packageEntity.pckg_version = [pckg_version];

      if (query) return await query.manager.save(packageEntity);
      return await this.dataSource.manager.save(packageEntity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  findAll() {
    return `This action returns all pckg`;
  }

  async findOne(
    findPckgDto: FindPckgDto,
    options?: Record<string, any>,
  ): Promise<CreatePckgDto> {
    try {
      return await this.dataSource.manager
        .createQueryBuilder(PckgEntity, 'pckgEntity')
        .where('pckgEntity.id = :id', { id: findPckgDto.pckg_id })
        .getOne();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async update(
    pckgEntity: PckgEntity,
    createPckgDto: CreatePckgDto,
    query?: QueryRunner,
  ) {
    try {
      pckgEntity.slug = createPckgDto.slug;
      pckgEntity.image = createPckgDto.image;
      pckgEntity.status = createPckgDto.status;
      pckgEntity.mobile_support = createPckgDto.mobile_support;
      if (query) return await query.manager.save(pckgEntity);
      return await this.dataSource.manager.save(pckgEntity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async delete(
    pckgEntity: PckgEntity,
    query?: QueryRunner,
  ): Promise<CreatePckgDto> {
    try {
      if (query) return await query.manager.remove(pckgEntity);
      return await this.dataSource.manager.remove(pckgEntity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
