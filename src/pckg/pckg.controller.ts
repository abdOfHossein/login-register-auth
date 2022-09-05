import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PckgService } from './pckg.service';
import { CreatePckgDto } from './dto/create-pckg.dto';
import { UpdatePckgDto } from './dto/update-pckg.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('pckg')
@Controller('pckg')
export class PckgController {
  constructor(private readonly pckgService: PckgService) {}

  @Post()
  create(@Body() createPckgDto: CreatePckgDto) {
    return this.pckgService.create(createPckgDto);
  }

  @Get()
  findAll() {
    return this.pckgService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pckgService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePckgDto: UpdatePckgDto) {
    return this.pckgService.update(+id, updatePckgDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pckgService.remove(+id);
  }
}
