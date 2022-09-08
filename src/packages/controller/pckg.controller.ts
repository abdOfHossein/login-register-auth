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
import { FindPckgDto } from '../dto/pckg/find.pckg.dto';
import { PckgEntity } from '../entities/pckg.entity';
import { PckgService } from '../service/pckg.service';

@ApiTags('packages/pckg')
@Controller('pckg')
export class PckgController {
  constructor(private readonly pckgService: PckgService) {}

  @Post(':pckg_version_id')
  create(@Param() Param: FindPckgDto, @Body() createPckgDto: CreatePckgDto) {
    return this.pckgService.create(createPckgDto, Param);
  }

  @Get(':pckg_id')
  findOne(@Param() Param: FindPckgDto) {
    return this.pckgService.findOne(Param);
  }

  @Put()
  update(pckgEntity: PckgEntity, createPckgDto: CreatePckgDto) {
    return this.pckgService.update(pckgEntity, createPckgDto);
  }

  @Delete()
  async delete(@Body() pckgEntity: PckgEntity) {
    return await this.pckgService.delete(pckgEntity);
  }
}
