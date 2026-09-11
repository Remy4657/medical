import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('search_keyword')
export class SearchKeyword {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  keyword: string;

  // Keyword đã bỏ dấu + lowercase
  // dùng để search
  @Column({
    name: 'normalized_keyword',
    type: 'varchar',
    length: 255,
    unique: true,
  })
  normalizedKeyword: string;

  // Keyword nào được ưu tiên
  // số càng nhỏ càng ưu tiên
  @Column({
    type: 'int',
    default: 0,
  })
  priority: number;

  @Column({
    name: 'is_active',
    default: true,
  })
  isActive: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
