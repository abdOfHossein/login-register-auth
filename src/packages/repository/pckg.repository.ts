import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { FindPckgDto } from '../dto/find.pckg.dto';
import { CreatePckgDto } from '../dto/pckg/create-pckg.dto';
import { PckgEntity } from '../entities/pckg.entity';

export class PckgRepository {
  constructor(
    @InjectRepository(PckgEntity)
    private ProductRepo: Repository<PckgEntity>,
    private dataSource: DataSource,
  ) {}

  async createEntity(
    createPckgDto: CreatePckgDto,
    findPckgDto: FindPckgDto,
    query?: QueryRunner,
  ) {
    try {
      const packageEntity = new PckgEntity();
      packageEntity.slug = createPckgDto.slug;
      packageEntity.image = createPckgDto.image;
      packageEntity.mobile_support = createPckgDto.mobile_support;
      if (query) return await query.manager.save(packageEntity);
      return await this.dataSource.manager.save(packageEntity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findOneEntity(
    findPckgDto: FindPckgDto,
    options?: Record<string, any>,
  ): Promise<CreatePckgDto> {
    try {
      return await this.dataSource.manager
        .createQueryBuilder(CreatePckgDto, 'createPckgDto')
        .where('createPckgDto.id=:id', { id: findPckgDto.pckg_id })
        .getOne();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async updateEntity(
    pckgEntity: PckgEntity,
    createPckgDto: CreatePckgDto,
    query?: QueryRunner,
  ) {
    try {
      pckgEntity.slug = createPckgDto.slug;
      pckgEntity.image = createPckgDto.image;
      pckgEntity.status = createPckgDto.status;
      pckgEntity.mobile_support = createPckgDto.mobile_support;
      if (query) return await query.manager.save(pckgEntity);
      return await this.dataSource.manager.save(pckgEntity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async deleteEntity(
    pckgEntity: PckgEntity,
    query?: QueryRunner,
  ): Promise<CreatePckgDto> {
    try {
      if (query) return await query.manager.remove(pckgEntity);
      return await this.dataSource.manager.remove(pckgEntity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
