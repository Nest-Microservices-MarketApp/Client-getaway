import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Max, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    example: 1,
    description: 'The page number',
    required: false,
  })
  @IsInt()
  @IsPositive()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({
    example: 10,
    description: 'The number of items per page',
    required: false,
  })
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(20)
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;
}
