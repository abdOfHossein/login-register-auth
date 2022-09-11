import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { CreatePckgVersionDto } from '../dto/pckg-version/create-pckg-version.dto';
import { FindPckgVersionDto } from '../dto/pckg-version/find.pckg-version.dto';
import { PckgVerRlEntity } from '../entities/pckg-version.entity';
import { ProPckgVerRlEntity } from '../entities/prod-packg-v.entity';
import { VersionEntity } from '../entities/version.entity';

export class PckgVersionRepository {
  constructor(
    @InjectRepository(PckgVerRlEntity)
    private pckgVerRlEntity: Repository<PckgVerRlEntity>,
    private dataSource: DataSource,
  ) {}

  async createEntity(
    createPckgVersionDto: CreatePckgVersionDto,
    prod_pckg_ver_rl: ProPckgVerRlEntity,
    version: VersionEntity,
    query?: QueryRunner,
  ) {
    const pckgVerRlEntity = new PckgVerRlEntity();
    pckgVerRlEntity.status = createPckgVersionDto.status;
    pckgVerRlEntity.price = createPckgVersionDto.price;
    pckgVerRlEntity.point = createPckgVersionDto.point;
    pckgVerRlEntity.wage_custom_fee = createPckgVersionDto.wage_custom_fee;
    pckgVerRlEntity.personal_price = createPckgVersionDto.personal_price;
    pckgVerRlEntity.group_price = createPckgVersionDto.group_price;
    pckgVerRlEntity.commission = createPckgVersionDto.commission;
    pckgVerRlEntity.prod_pckg_ver_rl = [prod_pckg_ver_rl];
    pckgVerRlEntity.version = version;
    if (query) return await query.manager.save(pckgVerRlEntity);
    return await this.dataSource.manager.save(pckgVerRlEntity);
  }

  async findOneEntity(
    findPckgVersionDto: FindPckgVersionDto,
    options?: Record<string, any>,
  ): Promise<PckgVerRlEntity> {
    return await this.dataSource.manager
      .getRepository(PckgVerRlEntity)
      .findOne({
        where: { id: findPckgVersionDto.pckg_version_id },
        relations: {
          prod_pckg_ver_rl: true,
          pckg:true,
          version:true
        },
      });
  }


  async findAllEntity(
    options?: Record<string, any>,
  ): Promise<PckgVerRlEntity[]> {
    return await this.dataSource.manager.getRepository(PckgVerRlEntity).find({
      where: {},
      relations: {
        prod_pckg_ver_rl: true,
        pckg:true,
        version:true
      },
    });
  }

  async updateEntity(
    pkgVerRlEntity: PckgVerRlEntity,
    createPckgVersionDto: CreatePckgVersionDto,
    query?: QueryRunner,
  ) {
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
  }

  async deleteEntity(
    pkgVerRlEntity: PckgVerRlEntity,
    query?: QueryRunner,
  ): Promise<CreatePckgVersionDto> {
    if (query) return await query.manager.remove(pkgVerRlEntity);
    return await this.dataSource.manager.remove(pkgVerRlEntity);
  }
}
