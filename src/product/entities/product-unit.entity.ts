import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductVariant } from './product-variant.entity';

@Entity('product_unit')
export class ProductUnit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({ length: 50, unique: true })
  code: string;

  @OneToMany(() => ProductVariant, (variant) => variant.unit)
  variants: ProductVariant[];
}
