import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { first, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';

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
  findAll(@Query() paginationDto: PaginationDto) {
    try {
      const products = firstValueFrom(
        this.productsClient.send('find-all-products', { ...paginationDto }),
      );

      return products;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The product ID',
    type: Number,
  })
  @ApiOperation({ summary: 'Retrieve a single product by ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = await firstValueFrom(
        this.productsClient.send('find-one-product', { id }),
      );

      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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
