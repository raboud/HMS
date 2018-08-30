import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { BasketService } from '../basket.service';
import { SecurityService } from '../../shared/services/security.service';
import { ConfigurationService } from '../../shared/services/configuration.service';
import { IBasket } from '../../shared/models/basket.model';

@Component({
    selector: 'app-basket-status',
    styleUrls: ['./basket-status.component.scss'],
    templateUrl: './basket-status.component.html'
})
export class BasketStatusComponent implements OnInit {
    basketItemAddedSubscription: Subscription;
    authSubscription: Subscription;

    badge: number = 0;

    constructor(
      private service: BasketService,
      private authService: SecurityService,
      private configurationService: ConfigurationService
    ) { }

    ngOnInit() {
        // Subscribe to Add Basket Observable:
        this.basketItemAddedSubscription = this.service.basketUpdated$.subscribe(
          item => {
            this.badge = this.service.getItemCount();
            });


        // Init:
    }
}

