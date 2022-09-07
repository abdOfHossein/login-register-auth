import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePckgDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your slug',
    example: 'Rice',
  })
  slug: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your status',
    example: 'true',
  })
  status: boolean;

  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your image',
    example: 'imgUrl',
  })
  image: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your mobile_support',
    example: '................',
  })
  mobile_support: string;
}
