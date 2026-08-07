import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductAttribute } from './product-attribute.entity';

@Entity('attribute')
export class Attribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  type: string;

  @OneToMany(() => ProductAttribute, (value) => value.attribute)
  values: ProductAttribute[];
}
