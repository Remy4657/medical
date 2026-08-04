import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity('session')
export class Session {
  @PrimaryColumn({
    type: 'varchar',
  })
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  token: string;

  @Column({
    type: 'varchar',
    name: 'userId',
  })
  userId: string;

  @Column({
    type: 'timestamp',
    name: 'expiresAt',
  })
  expiresAt: Date;

  @Column({
    type: 'text',
    nullable: false,
    name: 'ipAddress',
  })
  ipAddress: string | null;

  @Column({
    type: 'text',
    nullable: false,
    name: 'userAgent',
  })
  userAgent: string | null;

  @CreateDateColumn({ type: 'timestamp', name: 'createdAt' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'updatedAt' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.sessions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;
}
