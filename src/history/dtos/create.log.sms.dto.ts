import { ApiProperty } from '@nestjs/swagger';

export class CreateLogSmsDto {
  mobile : string
  code  : string
  serial : string
  hash_code : string
  user? : string
}

