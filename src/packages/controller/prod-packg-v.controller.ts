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
import { ProdPackgVService } from '../service/prod-packg-v.service';

@ApiTags('packages/prod-pckg-version')
@Controller('prod-packg-v')
export class ProdPackgVController {
  constructor(private readonly prodPackgVService: ProdPackgVService) {}

  @Post('/:product_id/:pckg_version_id')
  async create(
    @Param('product_id') product_id: string,
    @Param('pckg_version_id') pckg_version_id: string,
    @Body() createProdPackgVDto: CreateProdPackgVDto,
  ) {
    const findProductDto = { product_id };
    const findPckgVersionDto = { pckg_version_id };
    return await this.prodPackgVService.create(
      findProductDto,
      findPckgVersionDto,
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

  @Delete(':prod_pckg_ver_id')
  async delete(@Param('prod_pckg_ver_id') prod_pckg_ver_id: string) {
    const findProdPckgVer = { prod_pckg_ver_id };
    return await this.prodPackgVService.delete(findProdPckgVer);
  }
}
