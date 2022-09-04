import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your username',
    example: 'behzad',
    type: 'string',
  })
  username: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your password',
    example: '12345$gG',
    type: 'string',
  })
  password: string;
}
