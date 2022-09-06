import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProPckgVerRlEntity } from './entities/prod-packg-v.entity';
import { ProdPackgVController } from './prod-packg-v.controller';
import { ProdPackgVService } from './prod-packg-v.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProPckgVerRlEntity])],
  controllers: [ProdPackgVController],
  providers: [ProdPackgVService],
})
export class ProdPackgVModule {}
