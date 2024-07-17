import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  ClassSerializerInterceptor,
  UseInterceptors,
  Inject,
  Query,
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
import { PaginationDto } from 'src/common';
import { CreateOrderDto, UpdateOrderDto } from './dto';

@ApiTags('Orders')
@Controller('Orders')
@UseInterceptors(ClassSerializerInterceptor)
export class OrdersController {
  constructor(
    @Inject('ORDER_SERVICE') private readonly orderClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ description: 'The order to create', type: CreateOrderDto })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderClient.send('createOrder', createOrderDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all orders' })
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
    return this.orderClient.send('findAllOrders', { ...paginationDto }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single order' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The order ID',
    type: Number,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderClient.send('findOneOrder', id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Change the status of an order' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The order ID',
    type: Number,
  })
  changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderClient
      .send('changeOrderStatus', { id, ...updateOrderDto })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
