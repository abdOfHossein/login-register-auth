import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { PckgVerRlEntity } from '../../../package/pckg-version/entities/pckg-version.entity';
import { CreatePckgDto } from '../dto/pckg/create-pckg.dto';
import { FindPckgDto } from '../dto/find.pckg.dto';
import { PckgEntity } from '../entities/pckg.entity';
import { PckgRepository } from '../repository/pckg.repository';

@Injectable()
export class PckgService {
  constructor(
    @InjectRepository(PckgEntity)
    private ProductRepo: Repository<PckgEntity>,
    private dataSource: DataSource,
    private pckgRepository: PckgRepository,
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
     await this.pckgRepository.createEntity(createPckgDto, findPckgDto);
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
        .createQueryBuilder(CreatePckgDto, 'createPckgDto')
        .where('createPckgDto.id=:id', { id: findPckgDto.pckg_id })
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
      if (query) return await this.dataSource.manager.remove(pckgEntity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
