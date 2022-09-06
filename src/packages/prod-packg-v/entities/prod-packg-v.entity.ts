import { ProductEntity } from '../../product/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PckgVerRlEntity } from '../../pckg-version/entities/pckg-version.entity';
@Entity({ schema: 'pckg', name: 'prod_pakg_ver_rl' })
export class ProPckgVerRlEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: false })
  amount: number;

  @ManyToOne((type) => ProductEntity, (product) => product.prod_pckg_ver_rl )
  product: ProductEntity;

  @ManyToOne(
    (type) => PckgVerRlEntity,
    (pckg_ver_rl) => pckg_ver_rl.prod_pckg_ver_rl,
    // {
    //   primary: false,
    // },
  )
  pckg_ver_rl: PckgVerRlEntity;
}
