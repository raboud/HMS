import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../shared/models/product.model';
import { GenericValidator } from '../../../../identity/generic-validator';
import { ProductService } from '../../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BaseEditComponent } from '../../base-edit.component';
import { VendorService } from '../../vendor.service';
import { IVendor } from '../../../shared/models/vendor.model';
import { IUnit } from '../../../shared/models/unit.model';
import { IBrand } from '../../../shared/models/brand.model';
import { ICategory } from '../../../shared/models/category.model';
import { BrandService } from '../../brand.service';
import { CategoryService } from '../../category.service';
import { UnitService } from '../../unit.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent extends BaseEditComponent<IProduct> {
  vendors: IVendor[];
  brands: IBrand[];
  units: IUnit[];
  types: ICategory[];


  constructor (
    service: ProductService,
    route: ActivatedRoute,
    fb: FormBuilder,
    router: Router,
    private vendor: VendorService,
    private brand: BrandService,
    private type: CategoryService,
    private unit: UnitService,
  ) {
    super(service, route, fb, router);
    console.log('pce:');
    this.initItem();
    this.pageTitle = 'Product';
  }

  init() {
    console.log('pce:init');
    super.init();
    this.vendor.load().subscribe(() => {
      this.vendor.getItems().subscribe((x) => {
        console.log('pce:init:v');
        this.vendors = x;
      });
    });
    this.unit.load().subscribe(() => {
      this.unit.getItems().subscribe((x) => {
        console.log('pce:init:u');
        this.units = x;
      });
    });
    this.type.load().subscribe(() => {
      this.type.getItems().subscribe((x) => {
        console.log('pce:init:t');
        this.types = x;
      });
    });
    this.brand.load().subscribe(() => {
      this.brand.getItems().subscribe((x) => {
        console.log('pce:init:b');
        this.brands = x;
      });
    });
    console.log('pce:init:comp');
  }



  initItem() {
    console.log('pce:initItem');
    this.item = {
      Id: 0,
      Name: '',
      InActive: false,
      Description: '',
      Price: 0.00,
      PictureUri: '',
      Brand: {Name: ''},
      BrandId: 0,
      Types: [],
      Types2: [],
      Unit: {Name: ''},
      UnitId: 0,
      Count: 0,
      Vendor: {Name: ''},
      VendorId: 0
    };
  }


  buildFormGroup() {
    console.log('pce:buildFormGroup');
    this.form = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      inActive: [false],
      price: [Validators.required, Validators.min(0.01)],
      vendor: 0,
      brand: 0,
      unit: 0,
      type: 0,
    });
  }

  updateForm() {
    console.log('pce:updateForm');
    this.form.controls['name'].setValue(this.item.Name);
    this.form.controls['inActive'].setValue(this.item.InActive);
    this.form.controls['price'].setValue(this.item.Price);
    this.form.controls['vendor'].setValue(this.item.VendorId);
    this.form.controls['unit'].setValue(this.item.UnitId);
    this.form.controls['brand'].setValue(this.item.BrandId);
    this.form.controls['type'].setValue(this.item.Types);
    console.log(this.form.controls['vendor'].value);
  }

  updateItem() {
    console.log('pce:updateItem');
    this.item.Name = this.form.controls['name'].value;
    this.item.InActive = this.form.controls['inActive'].value;
    this.item.Price = this.form.controls['price'].value;
    this.item.VendorId = this.form.controls['vendor'].value;
    this.item.UnitId = this.form.controls['unit'].value;
    this.item.BrandId = this.form.controls['brand'].value;
    this.item.Types2 = this.form.controls['type'].value;
  }


}



/*
implements OnInit {
  item: IProduct;
  pageTitle = 'Unit Category';
  errorMessage: string;
  form: FormGroup;
  editing: boolean = true;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(
    private service: ProductService,
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
    this.service.load().subscribe(() => {
      this.route.params.subscribe(params => {
        const id = +params['id']; // (+) converts string 'id' to a number
        if (id === -1) {
          this.pageTitle = 'Add Product';
          this.editing = false;
          this.updateForm();
        } else {
          this.pageTitle = 'Edit Product';
          this.editing = true;
          this.getItem(id);
        }
      });
    });
  }

  getItem(id: number) {
    this.service.getItem(id).subscribe(item => {
      console.log(item);
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
*/
