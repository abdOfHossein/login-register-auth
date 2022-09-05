import { Module } from '@nestjs/common';
import { PckgVersionService } from './pckg-version.service';
import { PckgVersionController } from './pckg-version.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PckgVersion } from './entities/pckg-version.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PckgVersion])],
  controllers: [PckgVersionController],
  providers: [PckgVersionService]
})
export class PckgVersionModule {}
