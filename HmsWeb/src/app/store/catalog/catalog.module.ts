import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';
import { BrandService } from './brand.service';
import { CatalogService } from './catalog.service';
import { CategoryService } from './category.service';
import { ProductService } from './product.service';
import { UnitService } from './unit.service';
import { VendorService } from './vendor.service';

import { CatalogComponent } from './catalog.component';

@NgModule({
    imports: [
      BrowserModule,
      SharedModule,
      FontAwesomeModule,
      NgbModule,
        ],
    declarations: [
      CatalogComponent
    ],
    providers: [
      BrandService,
      CatalogService,
      CategoryService,
      ProductService,
      UnitService,
      VendorService,
    ]
})
export class CatalogModule { }
