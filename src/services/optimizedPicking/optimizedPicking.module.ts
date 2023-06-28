import { Module } from '@nestjs/common';
import { LoggerModule } from '../../logger/logger.module';
import { ProductsModule } from '../products/products.module';
import { OptimizedPickingConfig } from './optimizedPicking.config';
import { OptimizedPickingData } from './optimizedPicking.data';
import { OptimizedPickingService } from './optimizedPicking.service';


@Module({
    imports: [ProductsModule, LoggerModule],
    providers: [OptimizedPickingService, OptimizedPickingConfig, OptimizedPickingData],
    exports: [OptimizedPickingService, OptimizedPickingData],
})
export class OptimizedPickingModule { }
