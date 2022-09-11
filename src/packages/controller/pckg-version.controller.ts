import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePckgVersionDto } from '../dto/pckg-version/create-pckg-version.dto';
import { FindPckgVersionDto } from '../dto/pckg-version/find.pckg-version.dto';
import { PckgVerRlEntity } from '../entities/pckg-version.entity';
import { PckgVersionService } from '../service/pckg-version.service';

@ApiTags('packages/pckg-version')
@Controller('pckg-version')
export class PckgVersionController {
  constructor(private readonly pckgVersionService: PckgVersionService) {}

  @Post(':prod_pckg_ver_id')
  async create(
    @Param('prod_pckg_ver_id') prod_pckg_ver_id: string,
    @Body() createPckgVersionDto: CreatePckgVersionDto,
  ) {
    const findProdPckgVerDto = { prod_pckg_ver_id };
    return await this.pckgVersionService.create(
      findProdPckgVerDto,
      createPckgVersionDto,
    );
  }

  @Get(':pckg_version_id')
  async findOne(@Param() findPckgVersionDto: FindPckgVersionDto) {
    return await this.pckgVersionService.findOne(findPckgVersionDto);
  }

  @Get()
  async findAll() {
    return await this.pckgVersionService.findAll();
  }

  @Put(':pckg_version_id')
  async update(
    @Param('pckg_version_id') pckg_version_id: string,
    @Body() createPckgVerionDto: CreatePckgVersionDto,
  ) {
    const findPckgVer = { pckg_version_id };
    return await this.pckgVersionService.update(
      findPckgVer,
      createPckgVerionDto,
    );
  }

  @Delete()
  delete(@Body() pckgVerRlEntity: PckgVerRlEntity) {
    return this.pckgVersionService.delete(pckgVerRlEntity);
  }
}
