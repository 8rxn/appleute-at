import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { OrderDetails } from './interface';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderId: string;

  @ManyToOne((type) => User, (user) => user.orders, {
    cascade: true,
  })
  user: User;

  @Column('jsonb')
  orderDetails: OrderDetails[];

  @Column()
  orderDate: string;

  @Column()
  orderAmount: number;
}
