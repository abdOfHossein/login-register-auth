import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { FindProductDto } from '../dto/product/find.product.dto';
import { ProductEntity } from '../entities/product.entity';

export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    // private productRepo: Repository<ProductEntity>,
    private dataSource: DataSource,
  ) {}

  async createEntity(CreateProductDto: CreateProductDto, query?: QueryRunner) {
    const packageEntity = new ProductEntity();
    packageEntity.link = CreateProductDto.link;
    packageEntity.slug = CreateProductDto.slug;
    if (query) return await query.manager.save(packageEntity);
    return await this.dataSource.manager.save(packageEntity);
  }

  async findOneEntity(
    findProductDto: FindProductDto,
    options?: Record<string, any>,
  ): Promise<ProductEntity> {
    return await this.dataSource.manager.getRepository(ProductEntity).findOne({
      where: { id: findProductDto.product_id },
      relations: {
        prod_pckg_ver_rl: true,
      },
    });
  }

  async findAllEntity(): Promise<ProductEntity[]> {
    return await this.dataSource.manager.getRepository(ProductEntity).find({
      where: {},
      relations: {
        prod_pckg_ver_rl: true,
      },
    });
  }

  async updateEntity(
    productEntity: ProductEntity,
    createProductDto: CreateProductDto,
    query?: QueryRunner,
  ): Promise<any> {
    productEntity.slug = createProductDto.slug;
    productEntity.link = createProductDto.link;
    if (query) return await query.manager.save(productEntity);
    return await this.dataSource.manager.save(productEntity);
  }

  async deleteEntity(
    productEntity: ProductEntity,
    query?: QueryRunner,
  ): Promise<ProductEntity> {
    if (query) return await query.manager.remove(productEntity);
    return await this.dataSource.manager.remove(productEntity);
  }
}
