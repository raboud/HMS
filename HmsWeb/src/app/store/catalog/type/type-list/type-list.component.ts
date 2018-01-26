import { Component } from '@angular/core';
import { ICategory } from '../../../shared/models/category.model';
import { SecurityService } from '../../../shared/services/security.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../category.service';
import { BaseListComponent } from '../../base-List.component';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css']
})
export class TypeListComponent extends BaseListComponent<ICategory> {
  constructor (
    service: CategoryService,
    securityService: SecurityService,
    router: Router,
    route: ActivatedRoute
  ) {
    super(service, securityService, router, route);
    this.pageTitle = 'Category List';
  }
}
