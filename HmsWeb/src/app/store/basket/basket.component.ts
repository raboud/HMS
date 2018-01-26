import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { BasketService } from './basket.service';
import { IBasket } from '../shared/models/basket.model';
import { IBasketItem } from '../shared/models/basketItem.model';
import { BasketWrapperService } from '../shared/services/basket.wrapper.service';

@Component({
    selector: 'app-basket',
    styleUrls: ['./basket.component.scss'],
    templateUrl: './basket.component.html'
})
export class BasketComponent implements OnInit {
    errorMessages: any;
    basket: IBasket;
    totalPrice: number = 0;

    constructor(private service: BasketService, private router: Router, private basketwrapper: BasketWrapperService) { }

    ngOnInit() {
        this.service.getBasket().subscribe(basket => {
            this.basket = basket;
            this.calculateTotalPrice();
        });
    }

    itemQuantityChanged(item: IBasketItem) {
        this.calculateTotalPrice();
        this.service.setBasket(this.basket).subscribe(x => {});
    }

    update(event: any): Observable<boolean> {
        let setBasketObservable = this.service.setBasket(this.basket);
        setBasketObservable
            .subscribe(
            x => {
                this.errorMessages = [];
            },
            errMessage => this.errorMessages = errMessage.messages);
        return setBasketObservable;
    }

    checkOut(event: any) {
        this.update(event)
            .subscribe(
                x => {
                    this.errorMessages = [];
                    this.basketwrapper.basket = this.basket;
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
