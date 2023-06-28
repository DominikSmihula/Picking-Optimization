import { Injectable } from '@nestjs/common';
import { Logger } from '../../logger/logger';
import { OptimizedPickingConfig } from './optimizedPicking.config';
import { IProductPosition, IResponse, IPosition, IMappedProducts } from './optimizedPicking.interface'

@Injectable()
export class OptimizedPickingData {
    private products = [] as IProductPosition[];
    constructor(
        private config: OptimizedPickingConfig,
        private logger: Logger
    ) { }

    optimizePickingOrder(products: IProductPosition[], startingPosition: IPosition): IResponse {
        this.products = products;
        let sortedProducts = [] as Array<IMappedProducts>
        for (let i = 0; i < this.products.length; i++) {
            const currentPosition = this.getCurrentPosition(sortedProducts, i, startingPosition);
            const nextProduct = this.getNearestProduct(this.products, currentPosition);
            if (nextProduct) {
                this.markAsPicked(nextProduct)
                sortedProducts.push(nextProduct);
            }
        }
        this.logger.info({
            text: 'sortedProducts',
            data: sortedProducts,
        });
        console.log(sortedProducts)
        return this.collectData(sortedProducts)
    }
    markAsPicked(nextProduct: IMappedProducts): void {
        this.products.map((el) => {
            if (el.productId == nextProduct.element.productId) {
                el.picked = true
            }
        })
    }
    collectData(array: Array<IMappedProducts>): IResponse {
        return {
            pickingOrder: array.map((item) => ({
                positionId: item.element.positionId,
                productId: item.element.productId,
            })),
            distance: this.getTotalDistance(array)
        }
    }
    getCurrentPosition(array: Array<IMappedProducts>, index: number, startingPosition: IPosition): IPosition {
        const lastItem = array[array.length - 1]?.element;
        return index == 0 ? startingPosition : { x: lastItem?.x, y: lastItem?.y, z: lastItem?.z }
    }
    getTotalDistance(array: Array<IMappedProducts>): number {
        let sum = 0;
        array.forEach(num => {
            sum += Number(num.distance.toFixed(2));
        })
        this.logger.info({
            text: 'cumSum of distance',
            data: sum,
        });
        return sum
    }
    getNearestProduct(remainingProducts: IProductPosition[], currentPosition: IPosition): IMappedProducts | undefined {
        let distances = [];
        distances = remainingProducts.map((element) => {
            if (!element?.picked) {
                const distance = this.calculateDistance(currentPosition, element)
                return { distance, element }
            }
        })
        distances.sort(function (a, b) { return a.distance - b.distance });
        return distances[0]
    }
    calculateDistance(currentPosition: IPosition, newPosition: IPosition): number {
        const dx = newPosition.x - currentPosition.x;
        const dy = newPosition.y - currentPosition.y;
        const dz = newPosition.z - currentPosition.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
}