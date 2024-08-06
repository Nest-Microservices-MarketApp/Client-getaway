import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common';
import { OrderStatus } from '../enum/order-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class OrderPaginationDto extends PaginationDto {
  @ApiProperty({
    example: 'PENDING',
    description: 'The status of the order',
    enum: OrderStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(OrderStatus, {
    message: `Status must be a valid enum value: ${Object.values(OrderStatus).join(', ')}`,
  })
  status?: OrderStatus;
}
