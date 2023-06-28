import { Module } from '@nestjs/common';
import { AxiosModule } from '../axios/axios.module';
import { ProductsConfig } from './products.config';
import { ProductsService } from './products.service';


@Module({
    imports: [AxiosModule],
    providers: [ProductsService, ProductsConfig],
    exports: [ProductsService],
})
export class ProductsModule { }
