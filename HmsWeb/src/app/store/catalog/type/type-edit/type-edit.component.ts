import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '../../../shared/models/category.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GenericValidator } from '../../../../identity/generic-validator';
import { BaseEditComponent } from '../../base-edit.component';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'app-type-edit',
  templateUrl: './type-edit.component.html',
  styleUrls: ['./type-edit.component.css']
})
export class TypeEditComponent extends BaseEditComponent<ICategory> {
  constructor (
    service: CategoryService,
    route: ActivatedRoute,
    fb: FormBuilder,
    router: Router,
  ) {
    super(service, route, fb, router);
    this.pageTitle = 'Category';
  }

  initItem() {
    this.item = {
      Id: 0,
      Name: '',
      InActive: false,
    };
  }
}
