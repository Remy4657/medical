import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity('account')
export class Account {
  @PrimaryColumn({
    type: 'varchar',
  })
  id: string;

  @Column({
    name: 'accountId',
  })
  accountId: string;

  @Column({
    type: 'varchar',
    name: 'userId',
  })
  userId: string;

  @Column({
    name: 'providerId',
  })
  providerId: string;

  @Column({
    type: 'text',
    nullable: true,
    name: 'refreshToken',
  })
  refreshToken: string | null;

  @Column({
    type: 'text',
    nullable: true,
    name: 'accessToken',
  })
  accessToken: string | null;

  @Column({
    type: 'text',
    nullable: true,
  })
  password: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  scope: string | null;

  @Column({
    type: 'text',
    nullable: true,
    name: 'idToken',
  })
  idToken: string | null;

  @Column({
    type: 'timestamp',
    nullable: true,
    name: 'accessTokenExpiresAt',
  })
  accessTokenExpiresAt: Date | null;

  @Column({
    type: 'timestamp',
    nullable: true,
    name: 'refreshTokenExpiresAt',
  })
  refreshTokenExpiresAt: Date | null;

  @CreateDateColumn({ type: 'timestamp', name: 'createdAt' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'updatedAt' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.accounts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;
}
