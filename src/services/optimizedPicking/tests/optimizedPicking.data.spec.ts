import { OptimizedPickingData } from '../optimizedPicking.data';
import { OptimizedPickingConfig } from '../optimizedPicking.config';
import { Logger } from '../../../logger/logger';
import { IProductPosition, IPosition, IResponse, IMappedProducts } from '../optimizedPicking.interface'
import { productsInput, sortedProducts } from './testData'


describe('OptimizedPickingData', () => {
    let optimizedPickingData: OptimizedPickingData;
    let config: OptimizedPickingConfig;
    let logger: Logger;
    beforeEach(() => {
        config = new OptimizedPickingConfig();
        logger = new Logger();
        optimizedPickingData = new OptimizedPickingData(config, logger);
    });

    describe('optimizePickingOrder', () => {
        it('should optimize the picking order and return the result', () => {
            const products: IProductPosition[] = productsInput;
            const startingPosition: IPosition = { x: 0, y: 0, z: 0 };

            const result: IResponse = optimizedPickingData.optimizePickingOrder(
                products,
                startingPosition
            );
            expect(result).toBeDefined();
            expect(result.pickingOrder).toHaveLength(3);
            expect(result.distance).toBeCloseTo(3.46, 2);
        });
    });

    describe('markAsPicked', () => {
        it('should mark the product as picked', () => {
            const product: IMappedProducts = sortedProducts[0];
            optimizedPickingData['products'] = [product.element];
            optimizedPickingData.markAsPicked(product);
            expect(product.element.picked).toBe(true);
        });
    });

    describe('collectData', () => {
        it('should collect data from the array and return the result', () => {
            const array: IMappedProducts[] = sortedProducts

            const result: IResponse = optimizedPickingData.collectData(array);
            expect(result).toBeDefined();
            expect(result.pickingOrder).toHaveLength(3);
            expect(result.pickingOrder[0].positionId).toBe('1');
            expect(result.pickingOrder[0].productId).toBe('1');
            expect(result.pickingOrder[1].positionId).toBe('2');
            expect(result.pickingOrder[1].productId).toBe('2');
            expect(result.pickingOrder[2].positionId).toBe('3');
            expect(result.pickingOrder[2].productId).toBe('3');
        });
    });

    describe('getCurrentPosition', () => {
        it('should return the starting position when the index is 0', () => {
            const array: IMappedProducts[] = [];
            const index = 0;
            const startingPosition: IPosition = { x: 1, y: 2, z: 3 };
            const result: IPosition = optimizedPickingData.getCurrentPosition(
                array,
                index,
                startingPosition
            );
            expect(result).toEqual(startingPosition);
        });

        it('should return the position of the last item in the array when the index is not 0', () => {
            const array: IMappedProducts[] = sortedProducts
            const index = 1;
            const result: IPosition = optimizedPickingData.getCurrentPosition(
                array,
                index,
                { x: 0, y: 0, z: 0 }
            );
            expect(result).toEqual({ x: 2, y: 2, z: 2 });
        });
    });

    describe('getTotalDistance', () => {
        it('should return the total distance from the array', () => {
            const array: IMappedProducts[] = sortedProducts
            const result: number = optimizedPickingData.getTotalDistance(array);
            expect(result).toBeCloseTo(3.46, 2);
        });
    });

    describe('getNearestProduct', () => {
        it('should return the nearest product from the remaining products', () => {
            const remainingProducts: IProductPosition[] = [
                {
                    positionId: '1',
                    x: 0,
                    y: 0,
                    z: 0,
                    productId: '1',
                    quantity: 1,
                    picked: false,
                },
                {
                    positionId: '2',
                    x: 1,
                    y: 1,
                    z: 1,
                    productId: '2',
                    quantity: 1,
                    picked: false,
                },
            ];
            const currentPosition: IPosition = { x: 0, y: 0, z: 0 };
            const result: IMappedProducts | undefined =
                optimizedPickingData.getNearestProduct(
                    remainingProducts,
                    currentPosition
                );
            expect(result).toBeDefined();
            expect(result?.element.positionId).toBe('1');
            expect(result?.element.productId).toBe('1');
        });

        it('should return undefined if there are no remaining products', () => {
            const remainingProducts: IProductPosition[] = [];
            const currentPosition: IPosition = { x: 0, y: 0, z: 0 };
            const result: IMappedProducts | undefined =
                optimizedPickingData.getNearestProduct(
                    remainingProducts,
                    currentPosition
                );
            expect(result).toBeUndefined();
        });
    });

    describe('calculateDistance', () => {
        it('should calculate the distance between two positions', () => {
            const currentPosition: IPosition = { x: 0, y: 0, z: 0 };
            const newPosition: IPosition = { x: 1, y: 1, z: 1 };
            const result: number = optimizedPickingData.calculateDistance(
                currentPosition,
                newPosition
            );
            expect(result).toBeCloseTo(1.73, 2);
        });
    });
});

