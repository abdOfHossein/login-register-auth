import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { PckgModule } from './modules/pckg.module';
import { ProductModule } from './modules/product.module';
import { PckgVersionModule } from './modules/pckg-version.module';
import { ProdPackgVModule } from './modules/prod-packg-v.module';

@Module({
  imports:[PckgModule,ProductModule,PckgVersionModule,ProdPackgVModule],
  controllers: [PackagesController],
  providers: [PackagesService]
})
export class PackagesModule {}
