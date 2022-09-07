import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PckgVersionController } from './controller/pckg-version.controller';
import { PckgVerRlEntity } from './entities/pckg-version.entity';
import { ProdPackgVModule } from './prod-packg-v.module';
import { PckgVersionService } from './service/pckg-version.service';

@Module({
  imports: [TypeOrmModule.forFeature([PckgVerRlEntity]), ProdPackgVModule],
  controllers: [PckgVersionController],
  providers: [PckgVersionService],
})
export class PckgVersionModule {}
