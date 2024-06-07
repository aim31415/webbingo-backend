import { Collection, Entity, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from './baseEntity';
import { Term } from './term.entity';
import { User } from './user.entity';

@Entity()
export class Category extends BaseEntity {
  @ManyToOne()
  user!: User;

  @Property()
  categoryName!: string;

  @OneToMany(() => Term, (term) => term.category)
  terms = new Collection<Term>(this);
}
