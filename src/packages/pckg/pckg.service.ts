import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PckgVerRlEntity } from '../pckg-version/entities/pckg-version.entity';
import { CreatePckgDto } from './dto/create-pckg.dto';
import { UpdatePckgDto } from './dto/update-pckg.dto';
import { PckgEntity } from './entities/pckg.entity';

@Injectable()
export class PckgService {
  constructor(
    @InjectRepository(PckgEntity)
    private ProductRepo: Repository<PckgEntity>,
    private dataSource: DataSource,
  ) {}

  async create(createPckgDto: CreatePckgDto, pckg_version_id: string) {
    try {
      const pckg_version = await this.dataSource.manager
        .createQueryBuilder(PckgVerRlEntity, 'pckgVerRlEntity')
        .where('pckgVerRlEntity.id = :id', { id: pckg_version_id })
        .getOne();

      const packageEntity = new PckgEntity();
      packageEntity.slug = createPckgDto.slug;
      packageEntity.image = createPckgDto.image;
      packageEntity.mobile_support = createPckgDto.mobile_support;
      packageEntity.pckg_version = [pckg_version];
      await this.dataSource.manager.save(packageEntity);
      console.log(packageEntity);
      return packageEntity;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  findAll() {
    return `This action returns all pckg`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pckg`;
  }

  update(id: number, updatePckgDto: UpdatePckgDto) {
    return `This action updates a #${id} pckg`;
  }

  remove(id: number) {
    return `This action removes a #${id} pckg`;
  }
}
