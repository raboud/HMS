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

@NgModule({
    declarations: [StoreComponent],
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
