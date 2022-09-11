import { ProPckgVerRlEntity } from './prod-packg-v.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'pckg', name: 'product' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column({ unique: true })
  link: string;

  @OneToMany(
    (type) => ProPckgVerRlEntity,
    (prod_pckg_ver_rl) => prod_pckg_ver_rl.product,
  )
  prod_pckg_ver_rl: ProPckgVerRlEntity[];
}
