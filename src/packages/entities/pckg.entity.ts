import { PckgVerRlEntity } from './pckg-version.entity';
import {
    Column,
    Entity, OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ schema: 'pckg', name: 'pckg' })
export class PckgEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, unique: true })
  slug: string;

  @Column({ default: false })
  status: boolean;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  mobile_support: string;

  @OneToMany((type) => PckgVerRlEntity, (pckg_version) => pckg_version.pckg,)
  pckg_version: PckgVerRlEntity[];

}
