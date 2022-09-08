import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { FindProductDto } from '../dto/product/find.product.dto';
import { ProductEntity } from '../entities/product.entity';

export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
    private dataSource: DataSource,
  ) {}

  async createEntity(CreateProductDto: CreateProductDto, query?: QueryRunner) {
    try {
      const packageEntity = new ProductEntity();
      packageEntity.link = CreateProductDto.link;
      packageEntity.slug = CreateProductDto.slug;
      if (query) return await query.manager.save(packageEntity);
      return await this.dataSource.manager.save(packageEntity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findOneEntity(
    findProductDto: FindProductDto,
    options?: Record<string, any>,
  ): Promise<CreateProductDto> {
    try {
      console.log('start');

      console.log(findProductDto);

      const product = await this.dataSource.manager
        .createQueryBuilder(ProductEntity, 'productEntity')
        .where('productEntity.id = :id', {
          id: findProductDto.product_id,
        })
        .getOne();
      console.log(product);

      console.log('finish');
      return product;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async updateEntity(
    productEntity: ProductEntity,
    createProductDto: CreateProductDto,
    query?: QueryRunner,
  ): Promise<any> {
    try {
      productEntity.link = createProductDto.link;
      if (query) return await query.manager.save(createProductDto);
      return await this.dataSource.manager.save(createProductDto);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async deleteEntity(
    productEntity: ProductEntity,
    query?: QueryRunner,
  ): Promise<CreateProductDto> {
    try {
      if (query) return await query.manager.remove(productEntity);
      return await this.dataSource.manager.remove(productEntity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
