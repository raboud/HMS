import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogService } from '../../catalog.service';
import { ICategory } from '../../../shared/models/category.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GenericValidator } from '../../../../identity/generic-validator';

@Component({
  selector: 'app-type-edit',
  templateUrl: './type-edit.component.html',
  styleUrls: ['./type-edit.component.css']
})
export class TypeEditComponent implements OnInit {
  item: ICategory;
  pageTitle = 'Edit Category';
  errorMessage: string;
  form: FormGroup;
  editing: boolean = true;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(
    private service: CatalogService,
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
        this.pageTitle = 'Add Category';
        this.editing = false;
        this.item = {
          Id: 0,
          Name: '',
          InActive: false,
        };
        this.updateForm();
      } else {
        this.pageTitle = 'Edit Category';
        this.editing = true;
        this.getItem(id);
      }
    });
  }

  getItem(id: number) {
    this.service.getCategory(id).subscribe(item => {
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
      this.service.updateCategory(this.item).subscribe(data => {
        this.router.navigate(['category']);
      });
    } else {
      this.service.createCategory(this.item).subscribe(data => {
        this.router.navigate(['category']);
      });
    }
  }


}
