import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
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
  catch(exception: RpcException, host: ArgumentsHost) {
    const logger = new Logger('RpcCustomExceptionFilter');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rpcError = exception.getError() as RpcError | string;

    if (this.isRpcError(rpcError) && this.isValidHttpStatus(rpcError.status)) {
      return response.status(rpcError.status).json({
        status: rpcError.status,
        message: rpcError.message,
      });
    }

    // Log the exception for debugging purposes
    logger.log('Unhandled RPC exception:', exception);

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    });
  }

  private isRpcError(error: any): error is RpcError {
    return typeof error === 'object' && 'status' in error && 'message' in error;
  }

  private isValidHttpStatus(status: any): boolean {
    return typeof status === 'number' && status >= 100 && status <= 599;
  }
}
