import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreatePckgVersionDto } from '../dto/pckg-version/create-pckg-version.dto';
import { FindPckgVersionDto } from '../dto/pckg-version/find.pckg-version.dto';
import { FindProdPckgVerDto } from '../dto/prod-pckg-v/find.prod.pckg.ver.dto';
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
    private prodPackgVService: ProdPackgVService,
  ) {}

  async create(
    findProdPckgVerDto: FindProdPckgVerDto,
    createPckgVersionDto: CreatePckgVersionDto,
  ) {
    try {
      //find prod_pckg_ver_rl,pckg,version to add to packageversion for complete relation between them
      console.log(
        `findProdPckgVerDto ===>${JSON.stringify(findProdPckgVerDto)}`,
      );

      const prod_pckg_ver_rl: any = await this.prodPackgVService.findOne(
        findProdPckgVerDto,
      );
      console.log(prod_pckg_ver_rl);

      const version: any = this.dataSource.manager.create(VersionEntity);
      await this.dataSource.manager.save(version);
      const pckgVerRlEntity = await this.pckgVersionRepository.createEntity(
        createPckgVersionDto,
        prod_pckg_ver_rl,
        version,
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
    pckgVerRlEntity: PckgVerRlEntity,
  ): Promise<CreatePckgVersionDto> {
    try {
      return await this.pckgVersionRepository.deleteEntity(pckgVerRlEntity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
