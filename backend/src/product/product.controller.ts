import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Get('')
  findAll() {
    return this.productService.findAll();
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    return this.productService.findByCategory(category);
  }
}
