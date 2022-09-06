import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';


@ApiTags('packages/product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post(':prod_pckg_v_id')
  async create(
    @Param('prod_pckg_v_id') prod_pckg_v_id: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    return await this.productService.create(createProductDto, prod_pckg_v_id);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
