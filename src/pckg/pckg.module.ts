import { Module } from '@nestjs/common';
import { PckgService } from './pckg.service';
import { PckgController } from './pckg.controller';

@Module({
  controllers: [PckgController],
  providers: [PckgService]
})
export class PckgModule {}
