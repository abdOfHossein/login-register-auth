import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateProdPackgVDto } from '../dto/prod-pckg-v/create-prod-packg-v.dto';
import { UpdateProdPackgVDto } from '../prod-packg-v/dto/update-prod-packg-v.dto';
import { ProPckgVerRlEntity } from '../entities/prod-packg-v.entity';

@Injectable()
export class ProdPackgVService {
  constructor(
    @InjectRepository(ProPckgVerRlEntity)
    private proPckgVerRlRepo: Repository<ProPckgVerRlEntity>,
    private dataSource: DataSource,
  ) {}

  async create(createProdPackgVDto: CreateProdPackgVDto) {
    try {
      const proPckgVerRlEntity = await this.dataSource.manager
        .createQueryBuilder(ProPckgVerRlEntity, 'prod_pckg_v_rl')
        .insert()
        .into(ProPckgVerRlEntity)
        .values(createProdPackgVDto)
        .execute();
        return proPckgVerRlEntity
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  findAll() {
    return `This action returns all prodPackgV`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prodPackgV`;
  }

  update(id: number, updateProdPackgVDto: UpdateProdPackgVDto) {
    return `This action updates a #${id} prodPackgV`;
  }

  remove(id: number) {
    return `This action removes a #${id} prodPackgV`;
  }
}
