import { Component } from '@angular/core';
import { SecurityService } from '../../../shared/services/security.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IVendor } from '../../../shared/models/vendor.model';
import { IPage } from '../../../shared/models/pagination.model';
import { VendorService } from '../../vendor.service';
import { BaseListComponent } from '../../base-List.component';

@Component({
  selector: 'app-vendor-list',
  templateUrl: '../../type/type-list/type-list.component.html',
  styleUrls: ['../../type/type-list/type-list.component.css']
})
export class VendorListComponent extends BaseListComponent<IVendor> {
  constructor (
    service: VendorService,
    securityService: SecurityService,
    router: Router,
    route: ActivatedRoute
  ) {
    super(service, securityService, router, route);
    this.pageTitle = 'Vendor List';
  }
}
