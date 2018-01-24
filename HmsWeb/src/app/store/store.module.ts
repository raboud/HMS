import { NgModule, NgModuleFactoryLoader, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './store.routes';
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

@NgModule({
    declarations: [
      StoreComponent,
      VendorListComponent,
      VendorEditComponent,
      TypeEditComponent,
      TypeListComponent,
      BrandListComponent,
      BrandEditComponent,
      ProductEditComponent,
      ProductListComponent
    ],
    imports: [
        BrowserModule,
        routing,
        HttpModule,
        NgbModule,
        // Only module that app module loads
        SharedModule.forRoot(),
        CatalogModule,
        OrdersModule,
        BasketModule,
        CampaignsModule
    ],
    providers: [
      ConfigurationService,
        StoreService
    ],
})
export class StoreModule { }
