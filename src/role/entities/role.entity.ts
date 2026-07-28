import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 500, unique: true })
  name: string; // 'admin', 'user', 'moderator'

  @Column({ type: 'varchar', length: 500, nullable: true })
  description: string;
}
