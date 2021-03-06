import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from '../../base-List.component';
import { IProduct } from '../../../shared/models/product.model';
import { ProductService } from '../../product.service';
import { SecurityService } from '../../../shared/services/security.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: '../../type/type-list/type-list.component.html',
  styleUrls: ['../../type/type-list/type-list.component.css']
})
export class ProductListComponent  extends BaseListComponent<IProduct> {
  constructor (
    service: ProductService,
    securityService: SecurityService,
    router: Router,
    route: ActivatedRoute
  ) {
    super(service, securityService, router, route);
    this.pageTitle = 'Product List';
  }
}
