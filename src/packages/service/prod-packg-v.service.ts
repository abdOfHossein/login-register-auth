import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { CreateProdPackgVDto } from '../dto/prod-pckg-v/create-prod-packg-v.dto';
import { FindProdPckgVerDto } from '../dto/prod-pckg-v/find.prod.pckg.ver.dto';
import { FindProductDto } from '../dto/product/find.product.dto';
import { ProPckgVerRlEntity } from '../entities/prod-packg-v.entity';
import { ProdPckgVerRepository } from '../repository/prod-pckg-v.repository';
import { ProductService } from './product.service';

@Injectable()
export class ProdPackgVService {
  constructor(
    @InjectRepository(ProPckgVerRlEntity)
    private proPckgVerRlRepo: Repository<ProPckgVerRlEntity>,
    private dataSource: DataSource,
    private prodPckgVerRepository: ProdPckgVerRepository,
    private productService: ProductService,
  ) {}

  async create(
    createProdPackgVDto: CreateProdPackgVDto,
    findProductDto: FindProductDto,
    query?: QueryRunner,
  ) {
    try {
      const product = await this.productService.findOne(findProductDto);

      const prodPckgVersionEnt: any =
        await this.prodPckgVerRepository.createEntity(createProdPackgVDto);
      const updatedProdPckgVersionEnt = await this.dataSource.manager.update(
        ProPckgVerRlEntity,
        prodPckgVersionEnt.id,
        { product },
      );
      console.log(updatedProdPckgVersionEnt);
      return updatedProdPckgVersionEnt;
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
