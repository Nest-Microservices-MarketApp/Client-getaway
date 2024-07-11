import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { NotFoundMiddleware } from './common';

@Module({
  imports: [ProductsModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NotFoundMiddleware);
  }
}
