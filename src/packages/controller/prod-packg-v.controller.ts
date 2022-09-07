import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProdPackgVService } from '../service/prod-packg-v.service';
import { CreateProdPackgVDto } from '../dto/prod-pckg-v/create-prod-packg-v.dto';
import { UpdateProdPackgVDto } from '../prod-packg-v/dto/update-prod-packg-v.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';


// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@ApiTags('packages/prod-pckg-version')
@Controller('prod-packg-v')
export class ProdPackgVController {
  constructor(private readonly prodPackgVService: ProdPackgVService) {}

  @Post()
  create(@Body() createProdPackgVDto: CreateProdPackgVDto) {
    return this.prodPackgVService.create(createProdPackgVDto);
  }

  @Get()
  findAll() {
    return this.prodPackgVService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prodPackgVService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdPackgVDto: UpdateProdPackgVDto) {
    return this.prodPackgVService.update(+id, updateProdPackgVDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prodPackgVService.remove(+id);
  }
}
