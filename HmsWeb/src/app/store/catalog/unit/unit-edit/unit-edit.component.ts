import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GenericValidator } from '../../../../identity/generic-validator';
import { IUnit } from '../../../shared/models/unit.model';
import { UnitService } from '../../unit.service';
import { BaseEditComponent } from '../../base-edit.component';

@Component({
  selector: 'app-brand-edit',
  templateUrl: '../../type/type-edit/type-edit.component.html',
  styleUrls: ['../../type/type-edit/type-edit.component.css']
})
export class UnitEditComponent extends BaseEditComponent<IUnit> {
  constructor (
    service: UnitService,
    route: ActivatedRoute,
    fb: FormBuilder,
    router: Router,
  ) {
    super(service, route, fb, router);
    this.pageTitle = 'Vendor';
  }

  initItem() {
    this.item = {
      Id: 0,
      Name: '',
      InActive: false,
    };
  }
}
