import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { GroupEntity } from './entities/group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity])],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule {}
