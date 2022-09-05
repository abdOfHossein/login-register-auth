import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePckgVersionDto {
    @IsNotEmpty()
    @ApiProperty({
      description: 'enter your price',
      example: '100000 Rial',
    })
    price: string;
}
