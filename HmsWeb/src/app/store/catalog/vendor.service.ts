import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IVendor } from '../shared/models/vendor.model';

@Injectable()
export class VendorService extends BaseService<IVendor> {
  init() {
    this.baseUrl = this.configurationService.serverSettings.catalogUrl + '/api/v1/vendors';
  }
}
