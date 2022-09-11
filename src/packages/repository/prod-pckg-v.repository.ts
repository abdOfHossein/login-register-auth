import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { CreateProdPackgVDto } from '../dto/prod-pckg-v/create-prod-packg-v.dto';
import { FindProdPckgVerDto } from '../dto/prod-pckg-v/find.prod.pckg.ver.dto';
import { ProPckgVerRlEntity } from '../entities/prod-packg-v.entity';
import { ProductEntity } from '../entities/product.entity';

export class ProdPckgVerRepository {
  constructor(
    @InjectRepository(ProPckgVerRlEntity)
    private proPckgVerRlRepo: Repository<ProPckgVerRlEntity>,
    private dataSource: DataSource,
  ) {}

  async createEntity(
    createProdPackgVDto: CreateProdPackgVDto,
    product: ProductEntity,
    query?: QueryRunner,
  ) {
    const packageEntity = new ProPckgVerRlEntity();
    packageEntity.amount = createProdPackgVDto.amount;
    packageEntity.product = product;
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
  ): Promise<any> {
    proPckgVerRlEntity.amount = createProdPackgVDto.amount;
    if (query) return await query.manager.save(proPckgVerRlEntity);
    return await this.dataSource.manager.save(proPckgVerRlEntity);
  }

  async deleteEntity(
    proPckgVerRlEntity: ProPckgVerRlEntity,
    query?: QueryRunner,
  ): Promise<CreateProdPackgVDto> {
    if (query) return await query.manager.remove(proPckgVerRlEntity);
    return await this.dataSource.manager.remove(proPckgVerRlEntity);
  }
}
