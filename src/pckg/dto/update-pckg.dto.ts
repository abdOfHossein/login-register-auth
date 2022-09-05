import { PartialType } from '@nestjs/swagger';
import { CreatePckgDto } from './create-pckg.dto';

export class UpdatePckgDto extends PartialType(CreatePckgDto) {}
