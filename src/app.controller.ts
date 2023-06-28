import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { OptimizedPickingService } from './services/optimizedPicking/optimizedPicking.service';
import { PossitionsDTO, ProductDTO } from './dtos/positions.dto';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { ProductsService } from './services/products/products.service';
import { OptimizedPickingData } from './services/optimizedPicking/optimizedPicking.data';
import { IResponse, IProductPosition } from './services/optimizedPicking/optimizedPicking.interface';

@Controller()
export class AppController {
  constructor(
    private readonly pickingService: OptimizedPickingService,
    private data: OptimizedPickingData, private readonly positions: ProductsService) { }


  @Post('pickingOrder')
  @ApiBody({ type: [PossitionsDTO] })
  getPickingOrer(
    @Body() orders: PossitionsDTO[],
  ): IResponse {
    return this.data.optimizePickingOrder(orders, { x: 0, y: 0, z: 0 })
  }

  @Get('positions/:productId')
  @ApiParam({
    name: 'productId',
    required: true,
    description: 'productId',
    schema: { type: 'string' },
  })
  getPositions(@Param() params
  ): Promise<IProductPosition[]> {
    return this.positions.getPositions(params.productId);
  }

  @Post('pickingOptions')
  @ApiBody({ type: ProductDTO })
  getPickingOptions(
    @Body() products: ProductDTO,
  ): Promise<IResponse> {
    return this.pickingService.getDataWithOptimizedPath(products.productId, products.startingPosition)
  }
}
