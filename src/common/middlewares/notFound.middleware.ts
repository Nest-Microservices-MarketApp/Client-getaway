import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';

@Injectable()
export class NotFoundMiddleware implements NestMiddleware {
  use(_req: Request, _res: Response, _next: Function) {
    throw new NotFoundException('Resource not found');
  }
}
