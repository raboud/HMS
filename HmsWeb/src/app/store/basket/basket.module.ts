import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '../shared/shared.module';
import { BasketComponent } from './basket.component';
import { BasketStatusComponent } from './basket-status/basket-status.component';
import { BasketService } from './basket.service';

@NgModule({
    imports: [
      SharedModule,
      FontAwesomeModule
    ],
    declarations: [
      BasketComponent,
      BasketStatusComponent
    ],
    providers: [
      BasketService
    ],
    exports: [
      BasketStatusComponent
    ]
})
export class BasketModule {}
