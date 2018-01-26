import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GenericValidator } from '../../../../identity/generic-validator';
import { BrandService } from '../../brand.service';
import { IBrand } from '../../../shared/models/brand.model';
import { BaseEditComponent } from '../../base-edit.component';

@Component({
  selector: 'app-brand-edit',
  templateUrl: '../../type/type-edit/type-edit.component.html',
  styleUrls: ['../../type/type-edit/type-edit.component.css']
})
export class BrandEditComponent extends BaseEditComponent<IBrand> {
  constructor (
    service: BrandService,
    route: ActivatedRoute,
    fb: FormBuilder,
    router: Router,
  ) {
    super(service, route, fb, router);
    this.pageTitle = 'Brand';
  }

  initItem() {
    this.item = {
      Id: 0,
      Name: '',
      InActive: false,
    };
  }
}
