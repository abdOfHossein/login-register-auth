import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepositoryClass } from 'src/common/class/abstract.repository.class';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { CreatePckgVersionDto } from '../dto/pckg-version/create-pckg-version.dto';
import { FindPckgVersionDto } from '../dto/pckg-version/find.pckg-version.dto';
import { PckgVerRlEntity } from '../entities/pckg-version.entity';

export class PckgVersionRepository implements AbstractRepositoryClass {
  constructor(
    @InjectRepository(PckgVerRlEntity)
    private pckgVerRlEntity: Repository<PckgVerRlEntity>,
    private dataSource: DataSource,
  ) {}

  async createEntity(
    createPckgVersionDto: CreatePckgVersionDto,
    query?: QueryRunner,
  ) {
    try {
      const pckgVerRlEntity = new PckgVerRlEntity();
      pckgVerRlEntity.status = createPckgVersionDto.status;
      pckgVerRlEntity.price = createPckgVersionDto.price;
      pckgVerRlEntity.point = createPckgVersionDto.point;
      pckgVerRlEntity.wage_custom_fee = createPckgVersionDto.wage_custom_fee;
      pckgVerRlEntity.personal_price = createPckgVersionDto.personal_price;
      pckgVerRlEntity.group_price = createPckgVersionDto.group_price;
      pckgVerRlEntity.commission = createPckgVersionDto.commission;
      if (query) return await query.manager.save(pckgVerRlEntity);
      return await this.dataSource.manager.save(pckgVerRlEntity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findOneEntity(
    findPckgVersionDto: FindPckgVersionDto,
    options?: Record<string, any>,
  ): Promise<CreatePckgVersionDto> {
    try {
      return await this.dataSource.manager
        .createQueryBuilder(CreatePckgVersionDto, 'createPckgVersionDto')
        .where('createPckgVersionDto.id = :id', {
          id: findPckgVersionDto.pckg_version_id,
        })
        .getOne();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async updateEntity(
    pkgVerRlEntity: PckgVerRlEntity,
    createPckgVersionDto: CreatePckgVersionDto,
    query?: QueryRunner,
  ) {
    try {
      pkgVerRlEntity.link = createPckgVersionDto.link;
      pkgVerRlEntity.commission = createPckgVersionDto.commission;
      pkgVerRlEntity.group_price = createPckgVersionDto.group_price;
      pkgVerRlEntity.personal_price = createPckgVersionDto.personal_price;
      pkgVerRlEntity.point = createPckgVersionDto.point;
      pkgVerRlEntity.price = createPckgVersionDto.price;
      pkgVerRlEntity.status = createPckgVersionDto.status;
      pkgVerRlEntity.wage_custom_fee = createPckgVersionDto.wage_custom_fee;
      if (query) return await query.manager.save(pkgVerRlEntity);
      return await this.dataSource.manager.save(pkgVerRlEntity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async deleteEntity(
    pkgVerRlEntity: PckgVerRlEntity,
    query?: QueryRunner,
  ): Promise<CreatePckgVersionDto> {
    try {
      if (query) return await query.manager.remove(pkgVerRlEntity);
      return await this.dataSource.manager.remove(pkgVerRlEntity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
