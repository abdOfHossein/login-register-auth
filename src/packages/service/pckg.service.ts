import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { CreatePckgDto } from '../dto/pckg/create-pckg.dto';
import { FindPckgDto } from '../dto/pckg/find.pckg.dto';
import { PckgVerRlEntity } from '../entities/pckg-version.entity';
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
      const pckg = await this.pckgRepository.createEntity(createPckgDto);
      pckg.pckg_version;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findOne(
    findPckgDto: FindPckgDto,
    options?: Record<string, any>,
  ): Promise<CreatePckgDto> {
    try {
      return await this.pckgRepository.findOneEntity(findPckgDto);
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
      return await this.pckgRepository.updateEntity(pckgEntity, createPckgDto);
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
      return await this.pckgRepository.deleteEntity(pckgEntity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
