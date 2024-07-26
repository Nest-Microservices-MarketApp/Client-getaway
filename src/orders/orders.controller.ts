import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ClassSerializerInterceptor,
  UseInterceptors,
  Inject,
  Query,
  ParseUUIDPipe,
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
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { PaginationDto } from 'src/common';

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
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'The order status',
    schema: { type: 'string', enum: ['PENDING', 'DELIVERED', 'CANCELLED'] },
  })
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.orderClient
      .send('findAllOrders', { ...orderPaginationDto })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get(':status')
  @ApiOperation({ summary: 'Retrieve all orders by status' })
  @ApiParam({
    name: 'status',
    required: true,
    description: 'The order status',
    schema: { type: 'string', enum: ['PENDING', 'DELIVERED', 'CANCELLED'] },
  })
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
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.orderClient
      .send('findAllOrders', {
        ...paginationDto,
        status: statusDto.status,
      })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Retrieve a single order' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The order ID',
    type: String,
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderClient.send('findOneOrder', { id }).pipe(
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
    type: String,
  })
  @ApiBody({ description: 'The new status', type: StatusDto })
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    return this.orderClient
      .send('changeOrderStatus', { id, ...statusDto })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
