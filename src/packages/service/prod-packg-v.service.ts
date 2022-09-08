import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { CreateProdPackgVDto } from '../dto/prod-pckg-v/create-prod-packg-v.dto';
import { FindProdPckgVerDto } from '../dto/prod-pckg-v/find.prod.pckg.ver.dto';
import { ProPckgVerRlEntity } from '../entities/prod-packg-v.entity';
import { ProdPckgVerRepository } from '../repository/prod-pckg-v.repository';

@Injectable()
export class ProdPackgVService {
  constructor(
    @InjectRepository(ProPckgVerRlEntity)
    private proPckgVerRlRepo: Repository<ProPckgVerRlEntity>,
    private dataSource: DataSource,
    private prodPckgVerRepository: ProdPckgVerRepository,
  ) {}

  async create(createProdPackgVDto: CreateProdPackgVDto, query?: QueryRunner) {
    try {
      return await this.prodPckgVerRepository.createEntity(createProdPackgVDto);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findOne(
    findProdPckgVerDto: FindProdPckgVerDto,
    options?: Record<string, any>,
  ): Promise<CreateProdPackgVDto> {
    try {
      return await this.prodPckgVerRepository.findOneEntity(findProdPckgVerDto);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async update(
    proPckgVerRlEntity: ProPckgVerRlEntity,
    createProdPackgVDto: CreateProdPackgVDto,
    query?: QueryRunner,
  ) {
    try {
      return await this.prodPckgVerRepository.updateEntity(
        proPckgVerRlEntity,
        createProdPackgVDto,
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async delete(
    proPckgVerRlEntity: ProPckgVerRlEntity,
    query?: QueryRunner,
  ): Promise<CreateProdPackgVDto> {
    try {
      return await this.prodPckgVerRepository.deleteEntity(proPckgVerRlEntity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
