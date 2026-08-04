import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ProductVariant } from './product-variant.entity';

@Entity('product_price')
export class ProductPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'numeric',
    precision: 15,
    scale: 2,
  })
  originalPrice: string;

  @Column({
    type: 'numeric',
    precision: 15,
    scale: 2,
  })
  salePrice: string;

  /**
   * Thời gian bắt đầu áp dụng giá
   */
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  startsAt: Date | null;

  /**
   * Thời gian kết thúc giá
   */
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  endsAt: Date | null;

  @OneToOne(() => ProductVariant, (variant) => variant.price, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'variant_id' })
  variant: ProductVariant;

  @UpdateDateColumn()
  updatedAt: Date;
}
