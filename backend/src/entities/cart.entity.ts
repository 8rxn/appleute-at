// cart.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  BeforeInsert,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.cart, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToMany(() => Product, (product) => product.carts)
  @JoinTable() // This will create a join table for Cart and Product
  products: Product[];
}
