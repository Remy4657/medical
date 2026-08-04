import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ProductVariant } from './product-variant.entity';

@Entity('inventory')
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    default: 0,
  })
  quantity: number;

  @Column({
    type: 'int',
    default: 0,
  })
  reservedQuantity: number;

  @OneToOne(() => ProductVariant, (variant) => variant.inventory, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'variant_id' })
  variant: ProductVariant;

  @UpdateDateColumn()
  updatedAt: Date;
}
