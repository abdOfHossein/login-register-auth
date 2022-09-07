import { IsNotEmpty } from 'class-validator';

export class FindPckgVersionDto {
  @IsNotEmpty()
  pckg_version_id: number;
}
