import { PartialType } from '@nestjs/swagger';
import { CreatePckgVersionDto } from './create-pckg-version.dto';

export class UpdatePckgVersionDto extends PartialType(CreatePckgVersionDto) {}
