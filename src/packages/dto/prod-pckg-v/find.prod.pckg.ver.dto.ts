import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FindProdPckgVerDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your prod_pckg_ver_id',
    example: '415dw15a1d56awdawdAFFSeff',
  })
  prod_pckg_ver_id: string;
}
