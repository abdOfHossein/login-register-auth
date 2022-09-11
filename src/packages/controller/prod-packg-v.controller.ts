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
import { CreateProdPackgVDto } from '../dto/prod-pckg-v/create-prod-packg-v.dto';
import { FindProdPckgVerDto } from '../dto/prod-pckg-v/find.prod.pckg.ver.dto';
import { FindProductDto } from '../dto/product/find.product.dto';
import { ProPckgVerRlEntity } from '../entities/prod-packg-v.entity';
import { ProdPackgVService } from '../service/prod-packg-v.service';

@ApiTags('packages/prod-pckg-version')
@Controller('prod-packg-v')
export class ProdPackgVController {
  constructor(private readonly prodPackgVService: ProdPackgVService) {}

  @Post(':product_id')
  async create(
    @Param() findProductDto: FindProductDto,
    @Body() createProdPackgVDto: CreateProdPackgVDto,
  ) {
    console.log(createProdPackgVDto);

    return await this.prodPackgVService.create(
      findProductDto,
      createProdPackgVDto,
    );
  }

  @Get(':prod_pckg_ver_id')
  findOne(@Param() findProdPckgVerDto: FindProdPckgVerDto) {
    return this.prodPackgVService.findOne(findProdPckgVerDto);
  }

  @Get()
  findAll() {
    return this.prodPackgVService.findAll();
  }

  @Put(':prod_pckg_ver_id')
  async update(
    @Param('prod_pckg_ver_id') prod_pckg_ver_id: string,
    @Body() createProdPackgVDto: CreateProdPackgVDto,
  ) {
    const findProdPckgVer = { prod_pckg_ver_id };
    return await this.prodPackgVService.update(
      findProdPckgVer,
      createProdPackgVDto,
    );
  }

  @Delete()
  async delete(@Body() proPckgVerRlEntity: ProPckgVerRlEntity) {
    return await this.prodPackgVService.delete(proPckgVerRlEntity);
  }
}
