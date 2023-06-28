import { Injectable } from '@nestjs/common';
import { Logger } from '../../logger/logger';
import { ProductsService } from '../products/products.service';
import { OptimizedPickingData } from './optimizedPicking.data';
import { IResponse, IPosition, IProductPosition } from './optimizedPicking.interface';

@Injectable()
export class OptimizedPickingService {
    constructor(
        private positions: ProductsService,
        private data: OptimizedPickingData,
        private logger: Logger
    ) { }

    getDataWithOptimizedPath(productIds: string[], currentPosition: IPosition): Promise<IResponse> {
        const promises = [];
        productIds.forEach((el) => {
            promises.push(this.positions.getPositions(el))
        })
        return Promise.all(promises).then((result) => {
            const data = Array.prototype.concat.apply([], result) as IProductPosition[];
            this.logger.info({
                text: 'All products',
                data: data,
            });
            return this.data.optimizePickingOrder(data, currentPosition)
        }).catch((err) => {
            throw err
        });
    }
}