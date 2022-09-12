import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FindVersionDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your product_id',
    example: '5468541f54awaa24154sffs4',
  })
  version_id: string;
}
