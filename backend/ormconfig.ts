import { Product } from 'src/entities/product.entity';
import { Order } from 'src/entities/order.entity';
import { User } from 'src/entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Cart } from 'src/entities/cart.entity';
import { Category } from 'src/entities/category.entity';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'testDB',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  entities: [User,Order,Product,Cart,Category],
  synchronize: true,
};

export default config;
