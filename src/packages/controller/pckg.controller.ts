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
import { CreatePckgDto } from '../dto/pckg/create-pckg.dto';
import { PckgEntity } from '../entities/pckg.entity';
import { PckgService } from '../service/pckg.service';

@ApiTags('packages/pckg')
@Controller('pckg')
export class PckgController {
  constructor(private readonly pckgService: PckgService) {}

  @Post(':pckg_version_id')
  async create(
    @Param('pckg_version_id') pckg_version_id: string,
    @Body() createPckgDto: CreatePckgDto,
  ) {
    const findPckgVersionDto = { pckg_version_id };
    return await this.pckgService.create(findPckgVersionDto, createPckgDto);
  }

  @Get(':pckg_id')
  async findOne(@Param('pckg_id') pckg_id: string) {
    const findPckgVersion = { pckg_id };
    return await this.pckgService.findOne(findPckgVersion);
  }

  @Get()
  async findAll() {
    return await this.pckgService.findAll();
  }

  @Put(':pckg_id')
  update(
    @Param('pckg_id') pckg_id: string,
    @Body() createPckgDto: CreatePckgDto,
  ) {
    const findPckg = { pckg_id };
    return this.pckgService.update(findPckg, createPckgDto);
  }

  @Delete()
  async delete(@Body() pckgEntity: PckgEntity) {
    return await this.pckgService.delete(pckgEntity);
  }
}
