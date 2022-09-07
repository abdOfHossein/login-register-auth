import { PartialType } from '@nestjs/swagger';
import { CreateProdPackgVDto } from './create-prod-packg-v.dto';

export class UpdateProdPackgVDto extends PartialType(CreateProdPackgVDto) {}
