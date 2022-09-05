import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your name',
    example: 'Soda',
  })
  name: string;
}
