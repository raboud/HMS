import { NgModule, NgModuleFactoryLoader, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StoreRoutingModule } from './store.routes';
import { StoreService } from './store.service';
import { StoreComponent } from './store.component';
import { SharedModule } from './shared/shared.module';
import { CatalogModule } from './catalog/catalog.module';
import { OrdersModule } from './orders/orders.module';
import { BasketModule } from './basket/basket.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { ConfigurationService } from './shared/services/configuration.service';
import { VendorListComponent } from './catalog/vendor/vendor-list/vendor-list.component';
import { VendorEditComponent } from './catalog/vendor/vendor-edit/vendor-edit.component';
import { TypeEditComponent } from './catalog/type/type-edit/type-edit.component';
import { TypeListComponent } from './catalog/type/type-list/type-list.component';
import { BrandListComponent } from './catalog/brand/brand-list/brand-list.component';
import { BrandEditComponent } from './catalog/brand/brand-edit/brand-edit.component';
import { ProductEditComponent } from './catalog/product/product-edit/product-edit.component';
import { ProductListComponent } from './catalog/product/product-list/product-list.component';
import { ProductDetailComponent } from './catalog/product/product-detail/product-detail.component';
import { UnitListComponent } from './catalog/unit/unit-list/unit-list.component';
import { UnitEditComponent } from './catalog/unit/unit-edit/unit-edit.component';

@NgModule({
    declarations: [
      BrandListComponent,
      BrandEditComponent,
      ProductEditComponent,
      ProductListComponent,
      ProductDetailComponent,
      StoreComponent,
      TypeEditComponent,
      TypeListComponent,
      UnitListComponent,
      UnitEditComponent,
      VendorListComponent,
      VendorEditComponent,
    ],
    imports: [
        BrowserModule,
        NgbModule,
        // Only module that app module loads
        SharedModule,
        CatalogModule,
        OrdersModule,
        BasketModule,
        CampaignsModule,
        StoreRoutingModule
    ],
    providers: [
      ConfigurationService,
        StoreService
    ],
})
export class StoreModule { }
