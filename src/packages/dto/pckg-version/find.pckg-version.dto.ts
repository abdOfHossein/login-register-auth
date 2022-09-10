import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FindPckgVersionDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your pckg_version_id',
    example: '5468541f54awaa24154sffs4',
  })
  pckg_version_id: string;
}
