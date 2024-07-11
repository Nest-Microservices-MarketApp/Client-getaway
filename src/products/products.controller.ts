import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  createProduct() {
    return 'Create product';
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all products' })
  @ApiQuery({
    name: 'limit',
    required: false,
    schema: { type: 'integer' },
  })
  @ApiQuery({
    name: 'page',
    required: false,
    schema: { type: 'integer' },
  })
  findAll() {
    return this.productsClient.send('find-all-products', {});
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The product ID',
    type: Number,
  })
  @ApiOperation({ summary: 'Retrieve a single product by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return 'Get product by id ' + id;
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The product ID',
    type: Number,
  })
  @ApiBody({
    description: 'The product to update',
    type: Object,
  })
  @ApiOperation({ summary: 'Update a product by ID' })
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return 'Update product by id ' + id + ' with body ' + JSON.stringify(body);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The product ID',
    type: Number,
  })
  @ApiOperation({ summary: 'Delete a product by ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return 'Delete product by id ' + id;
  }
}
