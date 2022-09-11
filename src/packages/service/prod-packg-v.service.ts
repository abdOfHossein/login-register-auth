import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
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
    findProductDto: FindProductDto,
    createProdPackgVDto: CreateProdPackgVDto,
  ) {
    try {
      const product: any = await this.productService.findOne(findProductDto);
      const prodPckgVersionEnt = await this.prodPckgVerRepository.createEntity(
        createProdPackgVDto,
        product,
      );
      return prodPckgVersionEnt;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findOne(
    findProdPckgVerDto: FindProdPckgVerDto,
  ): Promise<CreateProdPackgVDto> {
    try {
      const prodPckgVer = await this.prodPckgVerRepository.findOneEntity(
        findProdPckgVerDto,
      );
      console.log(prodPckgVer);
      return prodPckgVer;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findAll(): Promise<ProPckgVerRlEntity[]> {
    try {
      return await this.prodPckgVerRepository.findAllEntity();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async update(
    findProdPckgVerDto: FindProdPckgVerDto,
    createProdPackgVDto: CreateProdPackgVDto,
  ) {
    try {
      const prodPckgVer = await this.dataSource.manager
        .createQueryBuilder(ProPckgVerRlEntity, 'proPckgVerRlEntity')
        .where('proPckgVerRlEntity.id = :id', {
          id: findProdPckgVerDto.prod_pckg_ver_id,
        })
        .getOne();
        console.log(prodPckgVer);
        console.log(createProdPackgVDto);
        
      return await this.prodPckgVerRepository.updateEntity(
        prodPckgVer,
        createProdPackgVDto,
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async delete(
    proPckgVerRlEntity: ProPckgVerRlEntity,
  ): Promise<CreateProdPackgVDto> {
    try {
      return await this.prodPckgVerRepository.deleteEntity(proPckgVerRlEntity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
