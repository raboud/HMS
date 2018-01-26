import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from '../../base-List.component';
import { SecurityService } from '../../../shared/services/security.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IUnit } from '../../../shared/models/unit.model';
import { UnitService } from '../../unit.service';

@Component({
  selector: 'app-unit-list',
  templateUrl: '../../type/type-list/type-list.component.html',
  styleUrls: ['../../type/type-list/type-list.component.css']
})
export class UnitListComponent  extends BaseListComponent<IUnit> {
  constructor (
    service: UnitService,
    securityService: SecurityService,
    router: Router,
    route: ActivatedRoute
  ) {
    super(service, securityService, router, route);
    this.pageTitle = 'Unit List';
  }
}
