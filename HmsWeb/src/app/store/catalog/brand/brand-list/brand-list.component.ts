import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../../shared/services/configuration.service';
import { SecurityService } from '../../../shared/services/security.service';
import { IBrand } from '../../../shared/models/brand.model';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { IPage } from '../../../shared/models/pagination.model';
import { BrandService } from '../../brand.service';
import { BaseListComponent } from '../../base-List.component';

@Component({
  selector: 'app-brand-list',
  templateUrl: '../../type/type-list/type-list.component.html',
  styleUrls: ['../../type/type-list/type-list.component.css']
})
export class BrandListComponent  extends BaseListComponent<IBrand> {
  constructor (
    service: BrandService,
    configurationService: ConfigurationService,
    securityService: SecurityService,
    router: Router,
    route: ActivatedRoute
  ) {
    super(service, configurationService, securityService, router, route);
    this.pageTitle = 'Brand List';
  }
}
