import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async findOne(id: number) {
    return await this.productRepo.findOne({ where: { id: id } });
  }

  async findAll() {
    return await this.productRepo.find();
  }

  async findByCategory(category: string) {
    return await this.productRepo.find({
      where: {
        category: {
          name: category,
        },
      },
    });
  }

}
