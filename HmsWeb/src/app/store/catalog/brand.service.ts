import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/brand.model';
import { BaseService } from './base.service';

@Injectable()
export class BrandService extends BaseService<IBrand> {
  init() {
    this.baseUrl = this.configurationService.serverSettings.catalogUrl + '/api/v1/brands';
  }
}
