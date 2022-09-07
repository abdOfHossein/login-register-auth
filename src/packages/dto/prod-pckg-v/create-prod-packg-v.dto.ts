import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProdPackgVDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your amount',
    example: '100',
  })
  amount: number;
}
