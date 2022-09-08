import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PckgEntity } from './pckg.entity';
import { ProPckgVerRlEntity } from './prod-packg-v.entity';
import { VersionEntity } from './version.entity';

@Entity({ schema: 'pckg', name: 'package_version_rl' })
export class PckgVerRlEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  link: string;

  @Column({})
  status: boolean;

  @Column({ nullable: true, type: 'numeric' })
  price: number;

  @Column({ nullable: true, type: 'numeric' })
  point: number;

  @Column({ type: 'decimal', nullable: true })
  wage_custom_fee: number;

  @Column({ nullable: true })
  personal_price: number;

  @Column({ nullable: true })
  group_price: number;

  @Column({ type: 'decimal', nullable: true })
  commission: number;

  @OneToMany(
    (type) => ProPckgVerRlEntity,
    (prod_pckg_ver_rl) => prod_pckg_ver_rl.pckg_ver_rl,
    {
      cascade: true,
    },
  )
  prod_pckg_ver_rl: ProPckgVerRlEntity[];

  @ManyToOne(
    (type) => VersionEntity,
    (version) => version.pckg_version,
    // {
    //   primary: false,
    // },
  )
  version: VersionEntity;

  @ManyToOne((type) => PckgEntity, (pckg) => pckg.pckg_version)
  pckg: PckgEntity;
}
