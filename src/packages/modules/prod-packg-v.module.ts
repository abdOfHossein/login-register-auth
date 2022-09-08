import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdPackgVController } from '../controller/prod-packg-v.controller';
import { ProPckgVerRlEntity } from '../entities/prod-packg-v.entity'; 
import { ProdPckgVerRepository } from '../repository/prod-pckg-v.repository';
import { ProdPackgVService } from '../service/prod-packg-v.service'; 

@Module({
  imports: [TypeOrmModule.forFeature([ProPckgVerRlEntity])],
  controllers: [ProdPackgVController],
  providers: [ProdPackgVService,ProdPckgVerRepository],
  exports: [ProdPackgVService],
})
export class ProdPackgVModule {}
