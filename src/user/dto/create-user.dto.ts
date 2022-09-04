import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsPhoneNumber,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { UserNameExistsRule } from '../validator/user.validate';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  @ApiProperty({
    description: 'enter your firstName',
    example: 'behzad',
  })
  firstName: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  @ApiProperty({
    description: 'enter your lastName',
    example: 'shafiee',
  })
  lastName: string;

  @IsNotEmpty()
  @Validate(UserNameExistsRule)
  @MinLength(2)
  @MaxLength(30)
  @ApiProperty({
    description: 'enter your username',
    example: 'behzad',
  })
  username: string;

  @IsNotEmpty()
  @MaxLength(30)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'password must Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
    },
  )
  @ApiProperty({
    description: 'enter your password',
    example: '12345$gG',
  })
  password: string;

  @IsNotEmpty()
  @IsPhoneNumber('IR', {
    message: 'phonenumber must start with 09.... or +98.... and has 11 number',
  })
  @MaxLength(30)
  @ApiProperty({
    description: 'enter your phonenumber',
    example: '09183541145',
  })
  phonenumber: string;
}
