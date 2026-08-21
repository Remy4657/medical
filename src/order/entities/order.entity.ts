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
import { User } from '../../auth/entities/user.entity';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from '../enums/order-status.enum';
import { PaymentStatus } from '../enums/payment-status.enum';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 30,
    unique: true,
  })
  orderCode: string;

  @ManyToOne(() => User, (user) => user.orders, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'varchar',
    length: 30,
    default: 'PENDING',
  })
  status: OrderStatus;

  @Column({
    type: 'varchar',
    length: 30,
    default: 'UNPAID',
  })
  paymentStatus: PaymentStatus;

  @Column({
    type: 'varchar',
    length: 30,
  })
  paymentMethod: string;

  @Column({
    type: 'numeric',
    precision: 15,
    scale: 2,
  })
  subtotal: string;

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
    default: 0,
  })
  shippingFee: string;

  @Column({
    type: 'numeric',
    precision: 15,
    scale: 2,
  })
  totalAmount: string;

  @Column({ length: 255 })
  receiverName: string;

  @Column({ length: 20 })
  receiverPhone: string;

  @Column({ type: 'text' })
  shippingAddress: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  note: string | null;

  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: true,
  })
  items: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
