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
import { PckgService } from '../service/pckg.service';

@ApiTags('packages/pckg')
@Controller('pckg')
export class PckgController {
  constructor(private readonly pckgService: PckgService) {}

  @Post()
  async create(@Body() createPckgDto: CreatePckgDto) {
    return await this.pckgService.create(createPckgDto);
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

  @Delete(':pckg_id')
  async delete(@Param('pckg_id') pckg_id: string) {
    const findProdPckgVer = { pckg_id };
    return await this.pckgService.delete(findProdPckgVer);
  }
}
