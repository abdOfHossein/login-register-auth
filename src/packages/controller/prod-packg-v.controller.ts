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
import { ProPckgVerRlEntity } from '../entities/prod-packg-v.entity';
import { ProdPackgVService } from '../service/prod-packg-v.service';

@ApiTags('packages/prod-pckg-version')
@Controller('prod-packg-v')
export class ProdPackgVController {
  constructor(private readonly prodPackgVService: ProdPackgVService) {}

  @Post()
  async create(@Body() createProdPackgVDto: CreateProdPackgVDto) {
    return await this.prodPackgVService.create(createProdPackgVDto);
  }

  @Get(':prod_pckg_ver_id')
  findOne(@Param() findProdPckgVerDto: FindProdPckgVerDto) {
    return this.prodPackgVService.findOne(findProdPckgVerDto);
  }

  @Put()
  update(
    proPckgVerRlEntity: ProPckgVerRlEntity,
    createProdPackgVDto: CreateProdPackgVDto,
  ) {
    return this.prodPackgVService.update(
      proPckgVerRlEntity,
      createProdPackgVDto,
    );
  }

  @Delete()
  async delete(@Body() proPckgVerRlEntity: ProPckgVerRlEntity) {
    return await this.prodPackgVService.delete(proPckgVerRlEntity);
  }
}
