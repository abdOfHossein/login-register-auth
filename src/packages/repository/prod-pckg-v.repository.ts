import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { FindPckgVersionDto } from '../dto/pckg-version/find.pckg-version.dto';
import { CreateProdPackgVDto } from '../dto/prod-pckg-v/create-prod-packg-v.dto';
import { FindProdPckgVerDto } from '../dto/prod-pckg-v/find.prod.pckg.ver.dto';
import { FindProductDto } from '../dto/product/find.product.dto';
import { PckgVerRlEntity } from '../entities/pckg-version.entity';
import { ProPckgVerRlEntity } from '../entities/prod-packg-v.entity';
import { ProductEntity } from '../entities/product.entity';

export class ProdPckgVerRepository {
  constructor(
    @InjectRepository(ProPckgVerRlEntity)
    // private proPckgVerRlRepo: Repository<ProPckgVerRlEntity>,
    private dataSource: DataSource,
  ) {}

  async createEntity(
    findPckgVersionDto: FindPckgVersionDto,
    findProductDto: FindProductDto,
    createProdPackgVDto: CreateProdPackgVDto,
    query?: QueryRunner,
  ) {
    const prodEntity = await this.dataSource.manager
      .createQueryBuilder(ProductEntity, 'productEntity')
      .where('productEntity.id=:id', { id: findProductDto.product_id })
      .getOne();
    const pckgVerEntity = await this.dataSource.manager
      .createQueryBuilder(PckgVerRlEntity, 'pckgVerRlEntity')
      .where('pckgVerRlEntity.id=:id', {
        id: findPckgVersionDto.pckg_version_id,
      })
      .getOne();
    const packageEntity = new ProPckgVerRlEntity();
    packageEntity.amount = createProdPackgVDto.amount;
    packageEntity.product = prodEntity;
    packageEntity.pckg_ver_rl = pckgVerEntity;
    if (query) return await query.manager.save(packageEntity);
    return await this.dataSource.manager.save(packageEntity);
  }

  async findOneEntity(
    findProdPckgVerDto: FindProdPckgVerDto,
    options?: Record<string, any>,
  ): Promise<CreateProdPackgVDto> {
    return await this.dataSource.manager
      .getRepository(ProPckgVerRlEntity)
      .findOne({
        where: {
          id: findProdPckgVerDto.prod_pckg_ver_id,
        },
        relations: {
          product: true,
        },
      });
  }

  async findAllEntity(
    options?: Record<string, any>,
  ): Promise<ProPckgVerRlEntity[]> {
    return await this.dataSource.manager
      .getRepository(ProPckgVerRlEntity)
      .find({
        where: {},
        relations: {
          product: true,
        },
      });
  }

  async updateEntity(
    proPckgVerRlEntity: ProPckgVerRlEntity,
    createProdPackgVDto: CreateProdPackgVDto,
    query?: QueryRunner,
  ): Promise<ProPckgVerRlEntity> {
    proPckgVerRlEntity.amount = createProdPackgVDto.amount;
    if (query) return await query.manager.save(proPckgVerRlEntity);
    return await this.dataSource.manager.save(proPckgVerRlEntity);
  }

  async deleteEntity(
    proPckgVerRlEntity: ProPckgVerRlEntity,
    query?: QueryRunner,
  ): Promise<ProPckgVerRlEntity> {
    if (query) return await query.manager.remove(proPckgVerRlEntity);
    return await this.dataSource.manager.remove(proPckgVerRlEntity);
  }
}

