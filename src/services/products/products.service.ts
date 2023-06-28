import { Injectable } from '@nestjs/common';
import { AxiosService } from '../axios/axios.service';
import { ProductsConfig } from './products.config';
import { IProductPosition } from '../optimizedPicking/optimizedPicking.interface';

@Injectable()
export class ProductsService {
  constructor(private config: ProductsConfig, private axios: AxiosService) { }
  async getPositions(productId: string): Promise<IProductPosition[]> {
    return this.axios.request({
      method: 'get',
      url: this.config.productsUrl + `${productId}/positions`,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.config.xApiKey
      },
    })
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        throw e
      });
  }
}
