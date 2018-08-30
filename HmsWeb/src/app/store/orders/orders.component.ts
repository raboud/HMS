import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError} from 'rxjs/operators';

import { OrdersService } from './orders.service';
import { IOrderSummary } from '../shared/models';
import { ConfigurationService } from '../shared/services/configuration.service';

@Component({
    selector: 'app-orders',
    styleUrls: ['./orders.component.scss'],
    templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {
    private oldOrders: IOrderSummary[];
    private interval = null;
    errorReceived: boolean;

    orders: IOrderSummary[];

    constructor(private service: OrdersService, private configurationService: ConfigurationService) { }

    ngOnInit() {
        this.configurationService.load().subscribe(() => {
            this.getOrders();
        });

        // call orders until new order is retrieved
        this.interval = setTimeout(() => {
            this.service.getOrders().subscribe(orders => {
                this.orders = orders;
                if (this.oldOrders) {
                if (this.orders.length !== this.oldOrders.length) {
                    clearInterval(this.interval);
                }
              }
            });
        }, 1000);
    }

    getOrders() {
        this.errorReceived = false;
        this.service.getOrders()
          .pipe(
            catchError((err) => this.handleError(err))
          )
          .subscribe(orders => {
            this.oldOrders = this.orders;
            this.orders = orders;
          }
        );
    }

    private handleError(error: any) {
        this.errorReceived = true;
        return Observable.throw(error);
    }
}

