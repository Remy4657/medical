import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductVariant } from '../../product/entities/product-variant.entity';
import { Order } from './order.entity';
@Entity('order_item')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.items, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => ProductVariant, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'variant_id' })
  variant: ProductVariant | null;

  @Column({ length: 255 })
  productName: string;

  @Column({ length: 100 })
  sku: string;

  @Column({
    length: 255,
    nullable: true,
  })
  packageDescription: string | null;
  @Column({
    length: 500,
    nullable: true,
  })
  image: string | null;
  @Column({
    length: 100,
  })
  unitName: string;

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

  @Column({
    type: 'int',
  })
  quantity: number;

  @Column({
    type: 'numeric',
    precision: 15,
    scale: 2,
    default: 0,
  })
  discountAmount: string;

  @Column({
    type: 'numeric',
    precision: 15,
    scale: 2,
  })
  subtotal: string;
}
