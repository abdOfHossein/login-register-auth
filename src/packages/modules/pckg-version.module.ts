import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PckgVersionController } from '../controller/pckg-version.controller';
import { PckgVerRlEntity } from '../entities/pckg-version.entity';
import { PckgVersionRepository } from '../repository/pckg-version.repository';
import { PckgVersionService } from '../service/pckg-version.service';
import { ProdPackgVModule } from './prod-packg-v.module';

@Module({
  imports: [TypeOrmModule.forFeature([PckgVerRlEntity]), ProdPackgVModule],
  controllers: [PckgVersionController],
  providers: [PckgVersionService,PckgVersionRepository],
})
export class PckgVersionModule {}
