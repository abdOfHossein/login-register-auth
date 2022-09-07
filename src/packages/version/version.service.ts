import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PckgVerRlEntity } from '../pckg-version/entities/pckg-version.entity';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';
import { VersionEntity } from './entities/version.entity';

@Injectable()
export class VersionService {

  constructor(
    @InjectRepository(VersionEntity)
    private VersionRepo: Repository<VersionEntity>,
    private dataSource: DataSource,
  ) {}
  
 async create(createVersionDto: CreateVersionDto,pckg_version_id:string) {
  //   try {
  //   const pckg_version = await this.dataSource.manager
  //     .createQueryBuilder(PckgVerRlEntity, 'versionEntity')
  //     .where('proPckgVerRlEntity.id = :id', { id: pckg_version_id })
  //     .getOne();

  //   const versionEntity = new VersionEntity();
  //   versionEntity.link = createProductDto.link;
  //   versionEntity.slug = createProductDto.slug;
  //   versionEntity.prod_pckg_ver_rl =[ prod_pckg_v];
  //   await this.dataSource.manager.save(productEntity);
  //   console.log(productEntity);
  //   return productEntity;
  // } catch (e) {
  //   console.log(e);
  //   throw e;
  // }
  }

  findAll() {
    return `This action returns all version`;
  }

  findOne(id: number) {
    return `This action returns a #${id} version`;
  }

  update(id: number, updateVersionDto: UpdateVersionDto) {
    return `This action updates a #${id} version`;
  }

  remove(id: number) {
    return `This action removes a #${id} version`;
  }
}
