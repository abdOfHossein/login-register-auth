import { PckgVerRlEntity } from '../../pckg-version/entities/pckg-version.entity';
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

  //   @Column({ type: 'enum', enum: TypePackage, default: TypePackage.NETWORK })
  //   typePackage: TypePackage;

  @OneToMany((type) => PckgVerRlEntity, (pckg_version) => pckg_version.pckg, {
    cascade: true,
  })
  pckg_version: PckgVerRlEntity[];

  //   @ManyToOne((type) => GroupPackageEntity, (group_package) => group_package.pkg, {
  //     primary: false,
  //   })
  //   group_package: GroupPackageEntity

}
