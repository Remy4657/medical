import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Account } from './account.entity';
import { Role } from '../../role/entities/role.entity';
import { Session } from './session.entity';
import { Cart } from '../../cart/entities/cart.entity';
import { Order } from '../../order/entities/order.entity';

@Entity('user')
export class User {
  @PrimaryColumn({
    type: 'varchar',
  })
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: true,
    name: 'phoneNumber',
  })
  phoneNumber: string | null;

  @Column({
    type: 'boolean',
    default: false,
    name: 'phoneNumberVerified',
  })
  phoneNumberVerified: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  name: string | null;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  gender: string | null;

  @Column({
    type: 'date',
    nullable: true,
  })
  birthday: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  image: string | null;

  @Column({
    type: 'boolean',
    default: false,
    name: 'emailVerified',
  })
  emailVerified: boolean;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updatedAt',
  })
  updatedAt: Date;

  // User 1:N Account
  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  // User 1:N Session
  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];

  // User 1:N Session
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  // User N:N Role
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_role',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];
  // User 1:1  Cart
  @OneToOne(() => Cart, (cart) => cart.user, {
    cascade: true,
  })
  cart: Cart;
}
