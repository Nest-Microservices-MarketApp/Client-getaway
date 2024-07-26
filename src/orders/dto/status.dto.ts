import { IsEnum, IsString } from 'class-validator';
import { OrderStatus } from '../enum/order-status.enum';

export class StatusDto {
  @IsString()
  @IsEnum(OrderStatus, {
    message: `Status must be a valid value (${Object.values(OrderStatus)})`,
  })
  status: OrderStatus;
}
