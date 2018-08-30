import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { BasketService } from './basket.service';
import { IBasket, IBasketItem } from '../shared/models';

@Component({
    selector: 'app-basket',
    styleUrls: ['./basket.component.scss'],
    templateUrl: './basket.component.html'
})
export class BasketComponent implements OnInit {
    errorMessages: any;
    basket: IBasket;
    totalPrice: number = 0;

    constructor(private service: BasketService, private router: Router) { }

    ngOnInit() {
        this.service.basketUpdated$.subscribe(basket => {
            this.cloneBasket();
            this.calculateTotalPrice();
        });
        this.cloneBasket();
        this.calculateTotalPrice();
}

  private cloneBasket() {
    this.basket = JSON.parse(JSON.stringify(this.service.basket));
  }

    itemQuantityChanged(item: IBasketItem) {
      // if (item.quantity === 0) {
      //   const index = this.basket.items.indexOf(item, 0);
      //   if (index > -1) {
      //      this.basket.items.splice(index, 1);
      //   }
      // }
        this.calculateTotalPrice();
    }

    isDirty(): boolean {

      return (JSON.stringify(this.basket) !== JSON.stringify(this.service.basket));
    }

    update(event: any): Observable<boolean> {
        const setBasketObservable = this.service.UpdateBasket(this.basket);
        setBasketObservable
            .subscribe(
            x => {
                this.errorMessages = [];
                this.cloneBasket();
            },
            errMessage => this.errorMessages = errMessage.messages);
        return setBasketObservable;
    }

    checkOut(event: any) {
        this.update(event)
            .subscribe(
                x => {
                    this.errorMessages = [];
                    this.basket = this.basket;
                    this.router.navigate(['order']);
                },
                errMessage => this.errorMessages = errMessage.messages);

    }


    private calculateTotalPrice() {
        this.totalPrice = 0;
        this.basket.items.forEach(item => {
            this.totalPrice += (item.unitPrice * item.quantity);
        });
    }
}
