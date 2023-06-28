import { AppController } from './app.controller';
import { OptimizedPickingModule } from './services/optimizedPicking/optimizedPicking.module';
import { ProductsModule } from './services/products/products.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ClsContextMiddleware } from './middlewares/clscontext.middleware';
@Module({
  imports: [OptimizedPickingModule, ProductsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor() { }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClsContextMiddleware).forRoutes('*');
  }
}

