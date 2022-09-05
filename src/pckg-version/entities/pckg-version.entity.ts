import { Product } from '../../product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PckgVersion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Product, (product) => product.pckgVersions)
  product: Product;
}
