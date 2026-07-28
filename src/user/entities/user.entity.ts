import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';

@Entity('user')
export class User {
  // Better Auth thường dùng string id (cuid/uuid)
  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: 'boolean', default: false })
  emailVerified: boolean;

  @Column({ type: 'varchar', length: 500, nullable: true })
  image: string | null;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role',
  })
  roles: Role[];

  @CreateDateColumn({
    name: 'createdAt',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updatedAt',
    type: 'timestamp',
  })
  updatedAt: Date;
}
