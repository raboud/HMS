import { NgModule, NgModuleFactoryLoader } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { routing } from './store.routes';
import { StoreService } from './store.service';
import { StoreComponent } from './store.component';
import { SharedModule } from './shared/shared.module';
import { CatalogModule } from './catalog/catalog.module';
import { OrdersModule } from './orders/orders.module';
import { BasketModule } from './basket/basket.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { ConfigurationService } from './shared/services/configuration.service';
import { VendorListComponent } from './vendor/vendor-list/vendor-list.component';
import { VendorEditComponent } from './vendor/vendor-edit/vendor-edit.component';
import { TypeEditComponent } from './type/type-edit/type-edit.component';
import { TypeListComponent } from './type/type-list/type-list.component';
import { BrandListComponent } from './brand/brand-list/brand-list.component';
import { BrandEditComponent } from './brand/brand-edit/brand-edit.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductListComponent } from './product/product-list/product-list.component';

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
