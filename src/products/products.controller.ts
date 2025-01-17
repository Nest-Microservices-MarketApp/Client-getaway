import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { PaginationDto } from 'src/common';
import { CreateProductDto, UpdateProductDto } from './dto';

@ApiTags('Products')
@Controller('products')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ description: 'The product to create', type: CreateProductDto })
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.client.send('createProduct', createProductDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all products' })
  @ApiQuery({
    name: 'limit',
    required: false,
    schema: { type: 'integer', default: 10 },
  })
  @ApiQuery({
    name: 'page',
    required: false,
    schema: { type: 'integer', default: 1 },
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client
      .send('findAllProducts', {
        ...paginationDto,
      })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
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
    return this.client.send('findOneProduct', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The product ID',
    type: Number,
  })
  @ApiBody({
    description: 'The product to update',
    type: UpdateProductDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.client.send('updateProduct', { id, ...updateProductDto }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The product ID',
    type: Number,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('removeProduct', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
