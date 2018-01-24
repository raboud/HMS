import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(
    private service: CatalogService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      inActive: ['']
    });
    this.route.params.subscribe(params => {
      const id = +params['id']; // (+) converts string 'id' to a number
      this.getItem(id);
    });
  }

  getItem(id: number) {
    this.service.getCategory(id).subscribe(item => {
      this.item = item;
      this.form.controls['name'].setValue(this.item.name);
      this.form.controls['inActive'].setValue(this.item.inActive);
      console.log(this.item);
    });
  }

  onRegister() {
    this.item.name = this.form.controls['name'].value;
    this.item.inActive = this.form.controls['inActive'].value;
    this.service.updateCategory(this.item).subscribe(
      data => {
        console.log(data);
      }
    );
  }
}
