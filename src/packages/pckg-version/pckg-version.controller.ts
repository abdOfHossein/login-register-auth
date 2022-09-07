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
import { CreatePckgVersionDto } from './dto/create-pckg-version.dto';
import { FindPckgVersionDto } from './dto/find.pckg-version.dto';
import { FindProdPckgVersionDto } from './dto/find.prod-pckg-ver.dto';
import { PckgVerRlEntity } from './entities/pckg-version.entity';
import { PckgVersionService } from './pckg-version.service';

@ApiTags('packages/pckg-version')
@Controller('pckg-version')
export class PckgVersionController {
  constructor(private readonly pckgVersionService: PckgVersionService) {}

  @Post(':prod_pckg_ver_rl_id')
  async create(
    @Param() findProdPckgVersionDto: FindProdPckgVersionDto,
    @Body() createPckgVersionDto: CreatePckgVersionDto,
  ) {
    return await this.pckgVersionService.create(
      createPckgVersionDto,
      findProdPckgVersionDto,
    );
  }

  @Get()
  findAll() {
    return this.pckgVersionService.findAll();
  }

  @Get(':id')
  async findOne(@Param() findPckgVersionDto: FindPckgVersionDto) {
    return await this.pckgVersionService.findOne(findPckgVersionDto);
  }

  @Put()
  update(
    pckgVerRlEntity: PckgVerRlEntity,
    createPckgVerionDto: CreatePckgVersionDto,
  ) {
    return this.pckgVersionService.update(pckgVerRlEntity, createPckgVerionDto);
  }

  @Delete()
  delete(@Body() pckgVerRlEntity: PckgVerRlEntity) {
    return this.pckgVersionService.delete(pckgVerRlEntity);
  }
}
