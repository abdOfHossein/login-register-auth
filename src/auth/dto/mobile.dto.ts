import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class MobileDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your mobile',
    example: '09126547784',
    type: 'string',
  })
  mobile: string;
}
