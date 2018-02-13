import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { DataService } from '../shared/services/data.service';
import { IOrder, IOrderSummary } from '../shared/models';
import { IOrderItem } from '../shared/models/orderItem.model';
import { IOrderDetail } from '../shared/models/order-detail.model';
import { SecurityService } from '../shared/services/security.service';
import { ConfigurationService } from '../shared/services/configuration.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import { BasketService } from '../basket/basket.service';


@Injectable()
export class OrdersService {
    private ordersUrl: string = '';

    constructor(
      private service: DataService,
      private basketService: BasketService,
      private identityService: SecurityService,
      private configurationService: ConfigurationService
    ) {
        this.configurationService.load().subscribe(() => {
          this.ordersUrl = this.configurationService.serverSettings.orderingUrl;
        });

    }

    getOrders(): Observable<IOrderSummary[]> {
        const url = this.ordersUrl + '/api/v1/orders';

        return this.service.get<IOrderSummary[]>(url);
    }

    getOrder(id: number): Observable<IOrderDetail> {
        const url = this.ordersUrl + '/api/v1/orders/' + id;

        return this.service.get<IOrderDetail>(url);
    }

    mapOrderAndIdentityInfoNewOrder(): IOrder {
        const order = <IOrder>{};
        const basket = this.basketService.basket;
        const identityInfo = this.identityService.UserData;

        // Identity data mapping:
        order.street = identityInfo.address_street;
        order.city = identityInfo.address_city;
        order.country = identityInfo.address_country;
        order.state = identityInfo.address_state;
        order.zipcode = identityInfo.address_zip_code;
        order.cardexpiration = identityInfo.card_expiration;
        order.cardnumber = identityInfo.card_number;
        order.cardsecuritynumber = identityInfo.card_security_number;
        order.cardtypeid = identityInfo.card_type;
        order.cardholdername = identityInfo.card_holder;
        order.total = 0;
        order.expiration = identityInfo.card_expiration;

        // basket data mapping:
        order.orderItems = new Array<IOrderItem>();
        basket.items.forEach(x => {
            const item: IOrderItem = <IOrderItem>{};
            item.pictureurl = x.pictureUrl;
            item.productId =  +x.productId;
            item.productname = x.productName;
            item.unitprice = x.unitPrice;
            item.units = x.quantity;

            order.total += (item.unitprice * item.units);

            order.orderItems.push(item);
        });

        order.buyer = basket.buyerId;

        return order;
    }

}

