import { Module } from '@nestjs/common';
import { VersionService } from './version.service';
import { VersionController } from './version.controller';
import { VersionEntity } from './entities/version.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VersionEntity])],
  controllers: [VersionController],
  providers: [VersionService]
})
export class VersionModule {}
