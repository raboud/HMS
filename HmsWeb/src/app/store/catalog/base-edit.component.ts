import {  OnInit, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICrud } from '../shared/models/pagination.model';
import { BaseService } from './base.service';
import { GenericValidator } from '../../identity/generic-validator';

@Injectable(
)
  export class BaseEditComponent<T extends ICrud> implements OnInit {
    item: T;
    pageTitle = 'NEED TO SET THIS';
    errorMessage: string;
    form: FormGroup;
    editing: boolean = true;

    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    protected genericValidator: GenericValidator;

    constructor(
      private service: BaseService<T>,
      private route: ActivatedRoute,
      protected fb: FormBuilder,
      private router: Router
    ) {
      this.buildFormGroup();
    }

    ngOnInit() {
      this.init();
    }

    init() {
      this.service.load().subscribe(() => {
        this.route.params.subscribe(params => {
          const id = +params['id']; // (+) converts string 'id' to a number
          if (id === -1) {
            this.pageTitle = 'Add ' + this.pageTitle;
            this.editing = false;
            this.initItem();
            this.updateForm();
          } else {
            this.pageTitle = 'Edit ' + this.pageTitle;
            this.editing = true;
            this.getItem(id);
          }
        });
      });
    }

    getItem(id: number) {
      this.service.getItem(id).subscribe(item => {
        this.item = item;
        this.updateForm();
      });
    }

    buildFormGroup() {
      this.form = this.fb.group({
        name: [
          '',
          [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
        ],
        inActive: [false]
      });
    }

    initItem() {
    }

    updateForm() {
      this.form.controls['name'].setValue(this.item.Name);
      this.form.controls['inActive'].setValue(this.item.InActive);
    }

    updateItem() {
      this.item.Name = this.form.controls['name'].value;
      this.item.InActive = this.form.controls['inActive'].value;
    }

    onSave() {
      this.updateItem();
      if (this.editing) {
        this.service.updateItem(this.item).subscribe(data => {
          this.returnToList();
        });
      } else {
        this.service.createItem(this.item).subscribe(data => {
          this.returnToList();
        });
      }
    }

    onCancel(){
      this.returnToList();
    }

    returnToList() {
      this.router.navigate(['..'], {relativeTo: this.route});
    }


  }
