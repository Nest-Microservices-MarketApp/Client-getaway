import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

interface RpcError {
  status: number;
  message: string;
}

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(RpcCustomExceptionFilter.name);

  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const rpcError = this.extractRpcError(exception);

    if (this.isEmptyResponseError(rpcError)) {
      return this.handleEmptyResponseError(response, rpcError);
    }

    if (this.isRpcError(rpcError) && this.isValidHttpStatus(rpcError.status)) {
      return this.handleKnownError(response, rpcError);
    }

    this.logger.error(
      'Unhandled RPC exception:',
      exception.message,
      exception.stack,
    );
    return this.handleUnknownError(response);
  }

  private extractRpcError(exception: RpcException): RpcError | string {
    return exception.getError() as RpcError | string;
  }

  private isEmptyResponseError(rpcError: RpcError | string): boolean {
    return rpcError.toString().includes('Empty response');
  }

  private handleEmptyResponseError(response: any, rpcError: RpcError | string) {
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: rpcError
        .toString()
        .substring(0, rpcError.toString().indexOf('(') - 1),
    });
  }

  private isRpcError(error: any): error is RpcError {
    return (
      error &&
      typeof error.status === 'number' &&
      typeof error.message === 'string'
    );
  }

  private isValidHttpStatus(status: number): boolean {
    return Object.values(HttpStatus).includes(status);
  }

  private handleKnownError(response: any, rpcError: RpcError) {
    return response.status(rpcError.status).json({
      status: rpcError.status,
      message: rpcError.message,
    });
  }

  private handleUnknownError(response: any) {
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    });
  }
}
