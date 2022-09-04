import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSmDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your target',
    example: '09386524565',
    type: 'string',
  })
  target: string;
}
