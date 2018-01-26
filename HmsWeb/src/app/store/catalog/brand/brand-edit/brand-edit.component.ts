import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GenericValidator } from '../../../../identity/generic-validator';
import { BrandService } from '../../brand.service';
import { IBrand } from '../../../shared/models/brand.model';

@Component({
  selector: 'app-brand-edit',
  templateUrl: '../../type/type-edit/type-edit.component.html',
  styleUrls: ['../../type/type-edit/type-edit.component.css']
})
export class BrandEditComponent implements OnInit {
  item: IBrand;
  pageTitle = 'Edit Category';
  errorMessage: string;
  form: FormGroup;
  editing: boolean = true;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(
    private service: BrandService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      inActive: [false]
    });
    this.route.params.subscribe(params => {
      const id = +params['id']; // (+) converts string 'id' to a number
      if (id === -1) {
        this.pageTitle = 'Add Brand';
        this.editing = false;
        this.item = {
          Id: 0,
          Name: '',
          InActive: false,
        };
        this.updateForm();
      } else {
        this.pageTitle = 'Edit Brand';
        this.editing = true;
        this.getItem(id);
      }
    });
  }

  getItem(id: number) {
    this.service.getItem(id).subscribe(item => {
      this.item = item;
      this.updateForm();
    });
  }

  updateForm() {
    this.form.controls['name'].setValue(this.item.Name);
    this.form.controls['inActive'].setValue(this.item.InActive);
}
  onSave() {
    this.item.Name = this.form.controls['name'].value;
    this.item.InActive = this.form.controls['inActive'].value;
    if (this.editing) {
      this.service.updateItem(this.item).subscribe(data => {
        this.router.navigate(['brand']);
      });
    } else {
      this.service.createItem(this.item).subscribe(data => {
        this.router.navigate(['brand']);
      });
    }
  }


}
