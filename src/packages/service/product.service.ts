import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { FindProductDto } from '../dto/product/find.product.dto';
import { ProductEntity } from '../entities/product.entity';
import { ProductRepository } from '../repository/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private dataSource: DataSource,
    private productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto) {
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
      console.log(findProductDto);

      return await this.productRepository.findOneEntity(findProductDto);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findAll(): Promise<CreateProductDto[]> {
    try {
      return await this.productRepository.findAllEntity();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async update(
    findProductDto: FindProductDto,
    createProductDto: CreateProductDto,
  ) {
    try {
      const product: ProductEntity = await this.dataSource.manager
        .createQueryBuilder(ProductEntity, 'productEntity')
        .where('productEntity.id = :id', { id: findProductDto.product_id })
        .getOne();
      console.log(product);
      return await this.productRepository.updateEntity(
        product,
        createProductDto,
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async delete(findProductDto: FindProductDto): Promise<ProductEntity> {
    try {
      const productEntity = await this.dataSource.manager
        .createQueryBuilder(ProductEntity, 'productEntity')
        .where('productEntity.id =:id', { id: findProductDto.product_id })
        .getOne();
      return await this.productRepository.deleteEntity(productEntity);

    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
