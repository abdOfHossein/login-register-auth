import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from '../controller/product.controller';
import { ProductEntity } from '../entities/product.entity';
import { ProductRepository } from '../repository/product.dto';
import { ProductService } from '../service/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [ProductService,ProductRepository],
})
export class ProductModule {}
