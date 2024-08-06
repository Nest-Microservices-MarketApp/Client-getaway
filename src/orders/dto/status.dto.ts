import { IsEnum, IsString } from 'class-validator';
import { OrderStatus } from '../enum/order-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class StatusDto {
  @ApiProperty({
    example: 'PENDING',
    description: 'The status of the order',
    enum: OrderStatus,
  })
  @IsString()
  @IsEnum(OrderStatus, {
    message: `Status must be a valid value (${Object.values(OrderStatus)})`,
  })
  status: OrderStatus;
}
