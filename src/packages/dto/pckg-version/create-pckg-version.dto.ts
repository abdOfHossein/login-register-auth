import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePckgVersionDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your link',
    example: 'www.example.com',
  })
  link: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your status',
    example: 'true',
  })
  status: boolean;

  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your price',
    example: '100000',
  })
  price: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your point',
    example: '123',
  })
  point: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your wage_custom_fee',
    example: '90000 ',
  })
  wage_custom_fee: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your personal_price',
    example: '900',
  })
  personal_price: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your group_price',
    example: '200000',
  })
  group_price: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your commission',
    example: '10000000',
  })
  commission: number;
}
