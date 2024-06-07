import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './baseEntity';
import { Category } from './category.entity';

@Entity()
export class Term extends BaseEntity {
  @Property()
  term!: string;

  @ManyToOne()
  category!: Category;
}
