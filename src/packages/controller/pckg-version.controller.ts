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
import { PckgVersionService } from '../service/pckg-version.service';

@ApiTags('packages/pckg-version')
@Controller('pckg-version')
export class PckgVersionController {
  constructor(private readonly pckgVersionService: PckgVersionService) {}

  @Post('/:pckg_id/:version_id')
  async create(
    @Param('pckg_id') pckg_id: string,
    @Param('version_id') version_id: string,
    @Body() createPckgVersionDto: CreatePckgVersionDto,
  ) {
    const findPckgDto = { pckg_id };
    const FindVersionDto = { version_id };

    return await this.pckgVersionService.create(
      findPckgDto,
      FindVersionDto,
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
  @Delete(':pckg_version_id')
  async delete(@Param('pckg_version_id') pckg_version_id: string) {
    const findProdPckgVer = { pckg_version_id };
    return await this.pckgVersionService.delete(findProdPckgVer);
  }
}
