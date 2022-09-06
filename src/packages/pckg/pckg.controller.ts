import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PckgService } from './pckg.service';
import { CreatePckgDto } from './dto/create-pckg.dto';
import { UpdatePckgDto } from './dto/update-pckg.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';


@ApiTags('packages/pckg')
@Controller('pckg')
export class PckgController {
  constructor(private readonly pckgService: PckgService) {}

  @Post(':pckg_version_id')
  create(
    @Param('pckg_version_id') pckg_version_id: string,
    @Body() createPckgDto: CreatePckgDto,
  ) {
    return this.pckgService.create(createPckgDto,pckg_version_id);
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
