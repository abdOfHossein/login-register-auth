import { IsNotEmpty } from 'class-validator';

export class FindProdPckgVersionDto {
  @IsNotEmpty()
  prod_pckg_ver_rl_id: number;
}
