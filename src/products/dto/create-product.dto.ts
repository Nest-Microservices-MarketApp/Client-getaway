import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Product Name',
    description: 'The name of the product',
  })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    example: 'Product description',
    description: 'The description of the product',
  })
  @IsString()
  @IsOptional()
  public description?: string;

  @ApiProperty({
    example: 100,
    description: 'The price of the product',
  })
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 2,
  })
  @Min(0)
  @Type(() => Number)
  @IsNotEmpty()
  public price: number;

  @ApiProperty({
    example: 10,
    description: 'The stock of the product',
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @Min(0)
  @IsNotEmpty()
  @IsOptional()
  public stock?: number;
}
