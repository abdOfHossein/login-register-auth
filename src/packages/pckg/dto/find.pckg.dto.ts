import { IsNotEmpty } from 'class-validator';

export class FindPckgDto {
  @IsNotEmpty()
  pckg_id: number;
}
