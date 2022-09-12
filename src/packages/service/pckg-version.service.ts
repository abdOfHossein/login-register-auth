import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreatePckgVersionDto } from '../dto/pckg-version/create-pckg-version.dto';
import { FindPckgVersionDto } from '../dto/pckg-version/find.pckg-version.dto';
import { FindPckgDto } from '../dto/pckg/find.pckg.dto';
import { FindProdPckgVerDto } from '../dto/prod-pckg-v/find.prod.pckg.ver.dto';
import { FindVersionDto } from '../dto/version/find.version.dto';
import { PckgVerRlEntity } from '../entities/pckg-version.entity';
import { VersionEntity } from '../entities/version.entity';
import { PckgVersionRepository } from '../repository/pckg-version.repository';
import { ProdPackgVService } from './prod-packg-v.service';

@Injectable()
export class PckgVersionService {
  constructor(
    @InjectRepository(PckgVerRlEntity)
    private pckgVerRlRepo: Repository<PckgVerRlEntity>,
    private dataSource: DataSource,
    private pckgVersionRepository: PckgVersionRepository,
    // private prodPackgVService: ProdPackgVService,
  ) {}

  async create(
    FindPckgDto:FindPckgDto,
    FindVersionDto:FindVersionDto,
    createPckgVersionDto: CreatePckgVersionDto,
  ) {
    try {
      const pckgVerRlEntity = await this.pckgVersionRepository.createEntity(
        FindPckgDto,
        FindVersionDto,
        createPckgVersionDto,
      );
      return pckgVerRlEntity;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findOne(
    findPckgVersionDto: FindPckgVersionDto,
    options?: Record<string, any>,
  ): Promise<PckgVerRlEntity> {
    try {
      return await this.pckgVersionRepository.findOneEntity(findPckgVersionDto);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findAll(options?: Record<string, any>): Promise<PckgVerRlEntity[]> {
    try {
      return await this.pckgVersionRepository.findAllEntity();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async update(
    findPckgVersionDto: FindPckgVersionDto,
    createPckgVersionDto: CreatePckgVersionDto,
  ) {
    try {
      const pckgVerRlEntity = await this.dataSource.manager
        .createQueryBuilder(PckgVerRlEntity, 'pckgVerRlEntity')
        .where('pckgVerRlEntity.id = :id', {
          id: findPckgVersionDto.pckg_version_id,
        })
        .getOne();
      return await this.pckgVersionRepository.updateEntity(
        pckgVerRlEntity,
        createPckgVersionDto,
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async delete(
    findPckgVersionDto: FindPckgVersionDto,
  ): Promise<CreatePckgVersionDto> {
    try {
      const pckgVerEntity = await this.dataSource.manager
        .createQueryBuilder(PckgVerRlEntity, 'pckgVerRlEntity')
        .where('pckgVerRlEntity.id =:id', {
          id: findPckgVersionDto.pckg_version_id,
        })
        .getOne();
      return await this.pckgVersionRepository.deleteEntity(pckgVerEntity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
