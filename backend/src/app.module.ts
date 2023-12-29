import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category/category.service';
import { CategoryModule } from './category/category.module';
import config from 'ormconfig';

@Module({
  imports: [
    UserModule,
    ProductModule,
    CartModule,
    OrderModule,
    AuthModule,
    CategoryModule,
    TypeOrmModule.forRoot(config),
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
