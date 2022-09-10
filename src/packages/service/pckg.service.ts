import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { FindPckgVersionDto } from '../dto/pckg-version/find.pckg-version.dto';
import { CreatePckgDto } from '../dto/pckg/create-pckg.dto';
import { FindPckgDto } from '../dto/pckg/find.pckg.dto';
import { PckgVerRlEntity } from '../entities/pckg-version.entity';
import { PckgEntity } from '../entities/pckg.entity';
import { PckgVersionRepository } from '../repository/pckg-version.repository';
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
    findPckgVersionDto: FindPckgVersionDto,
    createPckgDto: CreatePckgDto,
  ) {
    try {
      
      const pckg_version: any = await this.dataSource.manager.findOne(
        PckgVerRlEntity,
        { where: { id: findPckgVersionDto.pckg_version_id } },
      );
      console.log( pckg_version);
      
      console.log(pckg_version);

      const pckg = await this.pckgRepository.createEntity(
        createPckgDto,
        pckg_version,
      );
      return pckg;
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

  async update(pckgEntity: PckgEntity, createPckgDto: CreatePckgDto) {
    try {
      return await this.pckgRepository.updateEntity(pckgEntity, createPckgDto);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async delete(pckgEntity: PckgEntity): Promise<CreatePckgDto> {
    try {
      return await this.pckgRepository.deleteEntity(pckgEntity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
