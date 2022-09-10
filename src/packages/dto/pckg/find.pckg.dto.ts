import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FindPckgDto {
  @ApiProperty({
    description: 'enter your pckg_id',
    example: '415dw15a1d56awdawdAFFSeff',
  })
  @IsNotEmpty()
  pckg_id: string;
}
