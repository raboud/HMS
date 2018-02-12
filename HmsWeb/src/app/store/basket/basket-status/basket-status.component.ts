import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { BasketService } from '../basket.service';
import { BasketWrapperService } from '../../shared/services/basket.wrapper.service';
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
    basketDroppedSubscription: Subscription;

    badge: number = 0;

    constructor(
      private service: BasketService,
      private basketEvents: BasketWrapperService,
      private authService: SecurityService,
      private configurationService: ConfigurationService
    ) { }

    ngOnInit() {
        // Subscribe to Add Basket Observable:
        this.basketItemAddedSubscription = this.basketEvents.addItemToBasket$.subscribe(
            item => {
              console.log('addItemToBasket - ' + item.id);
              this.service.addItemToBasket(item).subscribe(res => {
                this.service.getBasket().subscribe((basket: IBasket) => {
                  if (basket) {
                    let sum = 0;
                    basket.items.forEach(element => {
                      sum += element.quantity;
                    });
                    this.badge = sum;
                  }
                });
              });
            });

        // Subscribe to Drop Basket Observable:
        this.basketDroppedSubscription = this.service.basketDroped$.subscribe(res => {
            this.badge = 0;
        });

        // Subscribe to login and logout observable
        this.authSubscription = this.authService.authenticationChallenge$.subscribe(res => {
            this.service.getBasket().subscribe(basket => {
                if (basket != null) {
                    this.badge = basket.items.length;
                }
            });
        });

        // Init:
        this.configurationService.load().subscribe(x => {
          this.service.getBasket().subscribe(basket => {
            if (basket != null) {
              this.badge = basket.items.length;
            }
          });
        });
    }
}

