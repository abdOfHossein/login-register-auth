import {
  Body, Controller, Delete, Get, Param, Patch, Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePckgVersionDto } from './dto/create-pckg-version.dto';
import { UpdatePckgVersionDto } from './dto/update-pckg-version.dto';
import { PckgVersionService } from './pckg-version.service';

@ApiTags('pckg-version')
@Controller('pckg-version')
export class PckgVersionController {
  constructor(private readonly pckgVersionService: PckgVersionService) {}

  @Post()
  create(@Body() createPckgVersionDto: CreatePckgVersionDto) {
    return this.pckgVersionService.create(createPckgVersionDto);
  }

  @Get()
  findAll() {
    return this.pckgVersionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pckgVersionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePckgVersionDto: UpdatePckgVersionDto,
  ) {
    return this.pckgVersionService.update(+id, updatePckgVersionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pckgVersionService.remove(+id);
  }
}
