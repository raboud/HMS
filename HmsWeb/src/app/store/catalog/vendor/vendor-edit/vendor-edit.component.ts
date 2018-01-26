import { Component, OnInit } from '@angular/core';
import { IVendor } from '../../../shared/models/vendor.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericValidator } from '../../../../identity/generic-validator';
import { VendorService } from '../../vendor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEditComponent } from '../../base-edit.component';


  @Component({
    selector: 'app-brand-edit',
    templateUrl: '../../type/type-edit/type-edit.component.html',
    styleUrls: ['../../type/type-edit/type-edit.component.css']
  })
  export class VendorEditComponent extends BaseEditComponent<IVendor> {
    constructor (
      service: VendorService,
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
