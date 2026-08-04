import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 500, unique: true })
  name: string; // 'admin', 'user', 'moderator'

  @Column({ type: 'varchar', length: 500, nullable: true })
  description: string;
  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
