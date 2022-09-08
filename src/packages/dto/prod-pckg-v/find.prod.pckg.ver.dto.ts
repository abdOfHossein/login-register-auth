import { IsNotEmpty } from 'class-validator';

export class FindProdPckgVerDto {
  @IsNotEmpty()
  prod_pckg_ver_id: number;
}
