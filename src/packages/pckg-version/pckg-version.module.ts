import { Module } from '@nestjs/common';
import { PckgVersionService } from './pckg-version.service';
import { PckgVersionController } from './pckg-version.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PckgVerRlEntity } from './entities/pckg-version.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PckgVerRlEntity])],
  controllers: [PckgVersionController],
  providers: [PckgVersionService]
})
export class PckgVersionModule {}
