import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your firstName',
    example: 'behzad',
  })
  firstName: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your lastName',
    example: 'shafiee',
  })
  lastName: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your username',
    example: 'behzad',
  })
  username: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your password',
    example: '12345$gG',
  })
  password: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your phonenumber',
    example: '09183541145',
  })
  phonenumber: string;
}
