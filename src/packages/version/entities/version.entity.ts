import { PckgVerRlEntity } from '../../pckg-version/entities/pckg-version.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'pckg', name: 'version' })
export class VersionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany((type) => PckgVerRlEntity, (pckg_version) => pckg_version.version)
  pckg_version: PckgVerRlEntity[];

}
