import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

import { Product } from './product.entity';
import { ProductUnit } from './product-unit.entity';
import { Inventory } from './inventory.entity';
import { ProductPrice } from './product-price.entity';

@Entity('product_variant')
@Index('idx_product_variant_product_id', ['product'])
export class ProductVariant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  sku: string;

  /**
   * Ví dụ:
   * "10 vỉ x 10 viên"
   * "Hộp 20 viên"
   */
  @Column({
    length: 255,
    nullable: true,
  })
  packageDescription: string | null;

  /**
   * Product
   */
  @ManyToOne(() => Product, (product) => product.variants, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  /**
   * Unit
   */
  @ManyToOne(() => ProductUnit, (unit) => unit.variants, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'unit_id' })
  unit: ProductUnit;

  /**
   * Price
   */
  @OneToOne(() => ProductPrice, (price) => price.variant, {
    cascade: true,
  })
  price: ProductPrice;

  /**
   * Inventory
   */
  @OneToOne(() => Inventory, (inventory) => inventory.variant, {
    cascade: true,
  })
  inventory: Inventory;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
