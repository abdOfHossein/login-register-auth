import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PckgController } from './controller/pckg.controller';
import { PckgEntity } from './entities/pckg.entity';
import { PckgService } from './service/pckg.service';

@Module({
  imports: [TypeOrmModule.forFeature([PckgEntity])],
  controllers: [PckgController],
  providers: [PckgService],
})
export class PckgModule {}
