import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { query } from 'express';
import { DataSource, Repository } from 'typeorm';
import { PckgVersion } from '../pckg-version/entities/pckg-version.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,

    private dataSource: DataSource,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // const pckgVersionRepo = await this.dataSource.getRepository(PckgVersion);
    // const pckgVersions = await pckgVersionRepo.find({
    //   relations: {
    //     product: true,
    //   },
    // });

    const pckgVersions=await this.dataSource.manager
    .createQueryBuilder(PckgVersion,'pckgVersion')
    .relation(PckgVersion,'product')
    .of(Product)
    .loadMany();
    const product: any = await this.dataSource.manager
      .createQueryBuilder(Product, 'product')
      .insert()
      .into(Product)
      .values(createProductDto)
      .execute();

    console.log(pckgVersions);
    product.packageVersions = pckgVersions;
    await this.dataSource.manager.save(product);
    console.log(product);
    return product;
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
