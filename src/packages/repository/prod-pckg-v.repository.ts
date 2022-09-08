import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { CreateProdPackgVDto } from '../dto/prod-pckg-v/create-prod-packg-v.dto';
import { FindProdPckgVerDto } from '../dto/prod-pckg-v/find.prod.pckg.ver.dto';
import { ProPckgVerRlEntity } from '../entities/prod-packg-v.entity';

export class ProdPckgVerRepository {
  constructor(
    @InjectRepository(ProPckgVerRlEntity)
    private proPckgVerRlRepo: Repository<ProPckgVerRlEntity>,
    private dataSource: DataSource,
  ) {}

  async createEntity(
    createProdPackgVDto: CreateProdPackgVDto,
    query?: QueryRunner,
  ) {
    try {
      const packageEntity = new ProPckgVerRlEntity();
      packageEntity.amount = createProdPackgVDto.amount;
      if (query) return await query.manager.save(packageEntity);
      return await this.dataSource.manager.save(packageEntity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findOneEntity(
    findProdPckgVerDto: FindProdPckgVerDto,
    options?: Record<string, any>,
  ): Promise<CreateProdPackgVDto> {
    try {
      return await this.dataSource.manager
        .createQueryBuilder(CreateProdPackgVDto, 'product')
        .where('product.id = :id', {
          id: findProdPckgVerDto.prod_pckg_ver_id,
        })
        .getOne();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async updateEntity(
    proPckgVerRlEntity: ProPckgVerRlEntity,
    createProdPackgVDto: CreateProdPackgVDto,
    query?: QueryRunner,
  ): Promise<any> {
    try {
      proPckgVerRlEntity.amount = createProdPackgVDto.amount;
      if (query) return await query.manager.save(proPckgVerRlEntity);
      return await this.dataSource.manager.save(proPckgVerRlEntity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async deleteEntity(
    proPckgVerRlEntity: ProPckgVerRlEntity,
    query?: QueryRunner,
  ): Promise<CreateProdPackgVDto> {
    try {
      if (query) return await query.manager.remove(proPckgVerRlEntity);
      return await this.dataSource.manager.remove(proPckgVerRlEntity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
