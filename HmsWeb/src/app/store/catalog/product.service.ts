import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IProduct } from '../shared/models/product.model';

@Injectable()
export class ProductService extends BaseService<IProduct> {
  init() {
    this.baseUrl = this.configurationService.serverSettings.catalogUrl + '/api/v1/products';
  }
}
