import { ApiProperty } from '@nestjs/swagger';
import { IResponse } from '../interfaces/response.interface';

export class ResponseDto<T> implements IResponse {
  @ApiProperty({
    example: 200,
    description: 'The status code of the response',
  })
  statusCode: number;

  @ApiProperty({
    example: 'Success',
    description: 'The message of the response',
  })
  message: string;

  @ApiProperty({
    example: {},
    description: 'The data of the response',
  })
  response: T;

  constructor(statusCode: number, message: string, data: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.response = data;
  }
}
