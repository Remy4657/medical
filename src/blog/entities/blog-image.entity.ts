// blog-image.entity.ts

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BlogPost } from './blog-post.entity';

@Entity('blog_image')
export class BlogImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'blog_post_id' })
  blogPostId: number;

  @ManyToOne(() => BlogPost, (post) => post.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'blog_post_id' })
  post: BlogPost;

  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'text', nullable: true })
  alt: string | null;

  // Chú thích ảnh
  @Column({ type: 'text', nullable: true })
  caption: string | null;

  // Thứ tự ảnh trong bài
  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
