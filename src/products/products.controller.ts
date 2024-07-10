import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct() {
    return 'Create product';
  }

  @Get()
  getProducts() {
    return 'Get products';
  }

  @Get(':id')
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return 'Get product by id ' + id;
  }

  @Patch(':id')
  updateProduct(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return 'Update product by id ' + id + ' with body ' + JSON.stringify(body);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return 'Delete product by id ' + id;
  }
}
