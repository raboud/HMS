import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';

import { SharedModule } from '../shared/shared.module';
import { CatalogComponent } from './catalog.component';
import { CatalogService } from './catalog.service';
import { Pager } from '../shared/components/pager/pager';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrandService } from './brand.service';
import { CategoryService } from './category.service';
import { VendorService } from './vendor.service';
import { ProductService } from './product.service';

@NgModule({
    imports: [
      BrowserModule,
      SharedModule,
      NgbModule,
        ],
    declarations: [
      CatalogComponent
    ],
    providers: [
      CatalogService,
      BrandService,
      CategoryService,
      VendorService,
      ProductService
    ]
})
export class CatalogModule { }
