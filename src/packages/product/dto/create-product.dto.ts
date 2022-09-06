import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your slug',
    example: 'Soda',
  })
  slug: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your link',
    example: 'www.example.com',
  })
  link: string;

  prod_pckg_ver_rl:any
}
