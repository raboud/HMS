import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { IOrderDetail } from '../../shared/models/order-detail.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-orders-detail',
    styleUrls: ['./orders-detail.component.scss'],
    templateUrl: './orders-detail.component.html'
})
export class OrdersDetailComponent implements OnInit {
    public order: IOrderDetail = <IOrderDetail>{};

    constructor(private service: OrdersService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = +params['id']; // (+) converts string 'id' to a number
            this.getOrder(id);
        });
    }

    getOrder(id: number) {
        this.service.getOrder(id).subscribe(order => {
            this.order = order;
        });
    }
}
