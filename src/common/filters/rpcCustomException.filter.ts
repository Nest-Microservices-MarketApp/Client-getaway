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
  private readonly logger = new Logger(RpcCustomExceptionFilter.name);

  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const rpcError = this.extractRpcError(exception);

    if (this.isRpcError(rpcError) && this.isValidHttpStatus(rpcError.status)) {
      return this.handleKnownError(response, rpcError);
    }

    this.logger.error('Unhandled RPC exception:', exception);
    return this.handleUnknownError(response, exception);
  }

  private extractRpcError(exception: RpcException): RpcError | string {
    return exception.getError() as RpcError | string;
  }

  private handleKnownError(response: any, rpcError: RpcError) {
    return response.status(rpcError.status).json({
      status: rpcError.status,
      message: rpcError.message,
    });
  }

  private handleUnknownError(response: any, exception: RpcException) {
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: `Internal server error: ${exception.message}`,
    });
  }

  private isRpcError(error: any): error is RpcError {
    return typeof error === 'object' && 'status' in error && 'message' in error;
  }

  private isValidHttpStatus(status: any): boolean {
    return typeof status === 'number' && status >= 100 && status <= 599;
  }
}
