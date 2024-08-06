import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class OrderItemDto {
  @ApiProperty({
    example: 1,
    description: 'The product ID',
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  productId: number;

  @ApiProperty({
    example: 2,
    description: 'The quantity of the product',
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  quantity: number;

  @ApiProperty({
    example: 100,
    description: 'The price of the product',
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number;
}
