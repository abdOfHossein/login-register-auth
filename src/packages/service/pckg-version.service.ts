import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { FindPckgVersionDto } from '../dto/pckg-version/find.pckg-version.dto'; 
import { FindProdPckgVersionDto } from '../dto/pckg-version/find.prod-pckg-ver.dto'; 
import { CreatePckgVersionDto } from '../dto/pckg-version/create-pckg-version.dto';
import { PckgVerRlEntity } from '../entities/pckg-version.entity';
import { VersionEntity } from '../entities/version.entity';
import { PckgVersionRepository } from '../repository/pckg-version.repository';
import { ProdPackgVService } from './prod-packg-v.service';
import { FindProdPckgVerDto } from '../dto/prod-pckg-v/find.prod.pckg.ver.dto';

@Injectable()
export class PckgVersionService {
  constructor(
    @InjectRepository(PckgVerRlEntity)
    private pckgVerRlRepo: Repository<PckgVerRlEntity>,
    private dataSource: DataSource,
    private pckgVersionRepository: PckgVersionRepository,
    private prodPackgVService: ProdPackgVService,
  ) {}

  async create(
    createPckgVersionDto: CreatePckgVersionDto,
    findProdPckgVerDto: FindProdPckgVerDto,
    query?: QueryRunner,
  ) {
    try {
      const prod_pckg_ver_rl = await this.prodPackgVService.findOne(
        findProdPckgVerDto
      );

      const pckgVerRlEntity:any = await this.pckgVersionRepository.createEntity(
        createPckgVersionDto,
      );

      pckgVerRlEntity.prod_pckg_ver_rl = [prod_pckg_ver_rl];

      const version = this.dataSource.manager.create(VersionEntity);
      version.pckg_version = [pckgVerRlEntity];
      await this.dataSource.manager.save(version);

      return pckgVerRlEntity;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findOne(
    findPckgVersionDto: FindPckgVersionDto,
    options?: Record<string, any>,
  ): Promise<CreatePckgVersionDto> {
    try {
      return await this.pckgVersionRepository.findOneEntity(findPckgVersionDto);
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
    pckgVerRlEntity: PckgVerRlEntity,
    query?: QueryRunner,
  ): Promise<CreatePckgVersionDto> {
    try {
      return await this.pckgVersionRepository.deleteEntity(pckgVerRlEntity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
