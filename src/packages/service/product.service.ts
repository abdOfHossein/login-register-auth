import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ProPckgVerRlEntity } from '../entities/prod-packg-v.entity';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { UpdateProductDto } from '../product/dto/update-product.dto';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private ProductRepo: Repository<ProductEntity>,
    private dataSource: DataSource,
  ) {}

  async create(createProductDto: CreateProductDto, prod_pckg_v_id: string) {
    try {
      const prod_pckg_v = await this.dataSource.manager
        .createQueryBuilder(ProPckgVerRlEntity, 'proPckgVerRlEntity')
        .where('proPckgVerRlEntity.id = :id', { id: prod_pckg_v_id })
        .getOne();
      console.log(createProductDto);

      const productEntity = new ProductEntity();
      productEntity.link = createProductDto.link;
      productEntity.slug = createProductDto.slug;
      productEntity.prod_pckg_ver_rl =[ prod_pckg_v];
      await this.dataSource.manager.save(productEntity);
      console.log(productEntity);
      return productEntity;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  
  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
