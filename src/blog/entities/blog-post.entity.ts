// blog-post.entity.ts

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BlogCategory } from './blog-category.entity';
import { BlogImage } from './blog-image.entity';

export enum BlogStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

@Entity('blog_post')
export class BlogPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => BlogCategory, (category) => category.posts, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'category_id' })
  category: BlogCategory;

  @Column({ length: 255 })
  title: string;

  @Column({ unique: true, length: 255 })
  slug: string;

  @Column({ type: 'text', nullable: true })
  excerpt: string | null;

  // TipTap JSON
  @Column({ type: 'jsonb' })
  content: Record<string, any>;

  // Ảnh cover dùng riêng cho card / listing / SEO
  @Column({ name: 'thumbnail', nullable: true })
  thumbnail: string | null;

  @Column({
    type: 'enum',
    enum: BlogStatus,
    default: BlogStatus.PUBLISHED,
  })
  status: BlogStatus;

  @Column({ name: 'published_at', type: 'timestamp', nullable: true })
  publishedAt: Date | null;

  @OneToMany(() => BlogImage, (image) => image.post, {
    cascade: true,
  })
  images: BlogImage[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
