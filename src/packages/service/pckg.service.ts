import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { FindPckgVersionDto } from '../dto/pckg-version/find.pckg-version.dto';
import { CreatePckgDto } from '../dto/pckg/create-pckg.dto';
import { FindPckgDto } from '../dto/pckg/find.pckg.dto';
import { PckgVerRlEntity } from '../entities/pckg-version.entity';
import { PckgEntity } from '../entities/pckg.entity';
import { VersionEntity } from '../entities/version.entity';
import { PckgRepository } from '../repository/pckg.repository';

@Injectable()
export class PckgService {
  constructor(
    @InjectRepository(PckgEntity)
    private pckgRepo: Repository<PckgEntity>,
    private dataSource: DataSource,
    private pckgRepository: PckgRepository,
  ) {}

  async create(createPckgDto: CreatePckgDto) {
    try {
    const version= this.dataSource.manager.create(VersionEntity);

      const pckg = await this.pckgRepository.createEntity(createPckgDto,version);
    

      return pckg;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findOne(findPckgDto: FindPckgDto): Promise<PckgEntity> {
    try {
      return await this.pckgRepository.findOneEntity(findPckgDto);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findAll(): Promise<PckgEntity[]> {
    try {
      return await this.pckgRepository.findAllEntity();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async update(
    findPckgDto: FindPckgDto,
    createPckgDto: CreatePckgDto,
  ): Promise<PckgEntity> {
    try {
      const pckgEntity = await this.dataSource.manager
        .createQueryBuilder(PckgEntity, 'pckgEntity')
        .where('pckgEntity.id = :id', {
          id: findPckgDto.pckg_id,
        })
        .getOne();
      return await this.pckgRepository.updateEntity(pckgEntity, createPckgDto);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async delete(findPckgDto: FindPckgDto): Promise<PckgEntity> {
    try {
      const pckgEntity = await this.dataSource.manager
        .createQueryBuilder(PckgEntity, 'pckgEntity')
        .where('pckgEntity.id =:id', { id: findPckgDto.pckg_id })
        .getOne();
      return await this.pckgRepository.deleteEntity(pckgEntity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
