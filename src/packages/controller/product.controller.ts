import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { FindProductDto } from '../dto/product/find.product.dto';
import { ProductEntity } from '../entities/product.entity';
import { ProductService } from '../service/product.service';

@ApiTags('packages/product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get(':product_id')
  findOne(@Param() findProductDto: FindProductDto) {
    return this.productService.findOne(findProductDto);
  }

  @Put()
  update(productEntity: ProductEntity, createProductDto: CreateProductDto) {
    return this.productService.update(productEntity, createProductDto);
  }

  @Delete()
  async delete(@Body() productEntity: ProductEntity) {
    return await this.productService.delete(productEntity);
  }
}
