import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PckgEntity } from './entities/pckg.entity';
import { PckgController } from './pckg.controller';
import { PckgService } from './pckg.service';

@Module({
  imports: [TypeOrmModule.forFeature([PckgEntity])],
  controllers: [PckgController],
  providers: [PckgService],
})
export class PckgModule {}
