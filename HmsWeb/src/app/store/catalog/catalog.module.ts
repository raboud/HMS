import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';

import { SharedModule } from '../shared/shared.module';
import { CatalogComponent } from './catalog.component';
import { CatalogService } from './catalog.service';
import { Pager } from '../shared/components/pager/pager';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
      BrowserModule,
      SharedModule,
      NgbModule,
        ],
    declarations: [
      CatalogComponent
    ],
    providers: [CatalogService]
})
export class CatalogModule { }
