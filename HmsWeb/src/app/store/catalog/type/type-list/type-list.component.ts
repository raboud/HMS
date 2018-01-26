import { Component } from '@angular/core';
import { ICategory } from '../../../shared/models/category.model';
import { ConfigurationService } from '../../../shared/services/configuration.service';
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
    configurationService: ConfigurationService,
    securityService: SecurityService,
    router: Router,
    route: ActivatedRoute
  ) {
    super(service, configurationService, securityService, router, route);
    this.pageTitle = 'Category List';
  }
}
