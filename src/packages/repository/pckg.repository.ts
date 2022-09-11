import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { CreatePckgDto } from '../dto/pckg/create-pckg.dto';
import { FindPckgDto } from '../dto/pckg/find.pckg.dto';
import { PckgVerRlEntity } from '../entities/pckg-version.entity';
import { PckgEntity } from '../entities/pckg.entity';

export class PckgRepository {
  constructor(
    @InjectRepository(PckgEntity)
    private pckgRepo: Repository<PckgEntity>,
    private dataSource: DataSource,
  ) {}

  async createEntity(
    createPckgDto: CreatePckgDto,
    pckgVerRlEntity: PckgVerRlEntity,
    query?: QueryRunner,
  ) {
    const packageEntity = new PckgEntity();
    packageEntity.slug = createPckgDto.slug;
    packageEntity.image = createPckgDto.image;
    packageEntity.mobile_support = createPckgDto.mobile_support;
    packageEntity.status = createPckgDto.status;
    packageEntity.pckg_version = [pckgVerRlEntity];
    if (query) return await query.manager.save(packageEntity);
    return await this.dataSource.manager.save(packageEntity);
  }

  async findOneEntity(
    findPckgDto: FindPckgDto,
    options?: Record<string, any>,
  ): Promise<PckgEntity> {
    return await this.dataSource.manager.getRepository(PckgEntity).findOne({
      where: { id: findPckgDto.pckg_id },
      relations: {
        pckg_version: true,
      },
    });
  }

  async findAllEntity(options?: Record<string, any>): Promise<PckgEntity[]> {
    return await this.dataSource.manager.getRepository(PckgEntity).find({
      where: {},
      relations: {
        pckg_version: true,
      },
    });
  }

  async updateEntity(
    pckgEntity: PckgEntity,
    createPckgDto: CreatePckgDto,
    query?: QueryRunner,
  ) {
    pckgEntity.slug = createPckgDto.slug;
    pckgEntity.image = createPckgDto.image;
    pckgEntity.status = createPckgDto.status;
    pckgEntity.mobile_support = createPckgDto.mobile_support;
    if (query) return await query.manager.save(pckgEntity);
    return await this.dataSource.manager.save(pckgEntity);
  }

  async deleteEntity(
    pckgEntity: PckgEntity,
    query?: QueryRunner,
  ): Promise<CreatePckgDto> {
    if (query) return await query.manager.remove(pckgEntity);
    return await this.dataSource.manager.remove(pckgEntity);
  }
}
