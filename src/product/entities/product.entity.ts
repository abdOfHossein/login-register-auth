import { PckgVersion } from '../../pckg-version/entities/pckg-version.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(()=>PckgVersion,pckgVersion=>pckgVersion.product)
  pckgVersions:PckgVersion[]

}
