import { Entity, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from './baseEntity';

@Entity()
export class User extends BaseEntity {
  @Unique()
  @Property()
  username!: string;

  @Property()
  displayName?: string;

  @Property()
  email?: string;

  @Property({ length: 64 })
  passwordHash!: string;
}
