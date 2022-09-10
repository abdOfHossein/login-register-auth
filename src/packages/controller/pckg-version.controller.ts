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
import { CreatePckgVersionDto } from '../dto/pckg-version/create-pckg-version.dto';
import { FindPckgVersionDto } from '../dto/pckg-version/find.pckg-version.dto';
import { PckgVerRlEntity } from '../entities/pckg-version.entity';
import { PckgVersionService } from '../service/pckg-version.service';

@ApiTags('packages/pckg-version')
@Controller('pckg-version')
export class PckgVersionController {
  constructor(private readonly pckgVersionService: PckgVersionService) {}

  //  @ApiParam({
  //     name: 'name',
  //     description:
  //       'This Decorator specifies the documentation for a specific Parameter, in this case the <b>name</b> Param.',
  //     allowEmptyValue: false,
  //     examples: {
  //       a: {
  //         summary: 'id of prod_pckg_version',
  //         value: 'daacd025-ad46-4831-8e6c-c8edb285fd25',
  //       },
  //     },
  //   })
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
