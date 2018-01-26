import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ICategory } from '../shared/models/category.model';

@Injectable()
export class CategoryService extends BaseService<ICategory> {
  init() {
    this.baseUrl = this.configurationService.serverSettings.catalogUrl + '/api/v1/categories';
  }
}
