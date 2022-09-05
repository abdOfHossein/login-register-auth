import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EmailDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your email',
    example: 'behzadshafiee1999@yahoo.com',
    type: 'string',
  })
  email: string;
}
