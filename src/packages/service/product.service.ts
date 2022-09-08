import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { FindProductDto } from '../dto/product/find.product.dto';
import { ProductEntity } from '../entities/product.entity';
import { ProductRepository } from '../repository/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    // private ProductRepo: Repository<ProductEntity>,
    private dataSource: DataSource,
    private productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto, query?: QueryRunner) {
    try {
      return await this.productRepository.createEntity(createProductDto);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findOne(
    findProductDto: FindProductDto,
    options?: Record<string, any>,
  ): Promise<CreateProductDto> {
    try {
      return await this.productRepository.findOneEntity(findProductDto);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async update(
    productEntity: ProductEntity,
    createProductDto: CreateProductDto,
    query?: QueryRunner,
  ) {
    try {
      return await this.productRepository.updateEntity(
        productEntity,
        createProductDto,
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async delete(
    productEntity: ProductEntity,
    query?: QueryRunner,
  ): Promise<CreateProductDto> {
    try {
      return await this.productRepository.deleteEntity(productEntity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
