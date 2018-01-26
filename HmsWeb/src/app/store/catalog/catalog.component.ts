import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { CatalogService } from './catalog.service';
import { IProduct } from '../shared/models/product.model';
import { ICategory } from '../shared/models/category.model';
import { IBrand } from '../shared/models/brand.model';
import { IPager } from '../shared/models/pager.model';
import { BasketWrapperService} from '../shared/services/basket.wrapper.service';
import { SecurityService } from '../shared/services/security.service';
import { IPage } from '../shared/models/pagination.model';

@Component({
    selector: 'app-catalog .catalog',
    styleUrls: ['./catalog.component.scss'],
    templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit {
    brands: IBrand[] = [];
    types: ICategory[] = [];
    page: number;
    items: IPage<IProduct>;
    brandSelected: number;
    typeSelected: number;
    authenticated: boolean = false;
    authSubscription: Subscription;
    errorReceived: boolean;

    constructor(
      private service: CatalogService,
      private basketService: BasketWrapperService,
      private securityService: SecurityService,
      private router: Router
    ) {
        this.authenticated = securityService.IsAuthorized;
    }

    ngOnInit() {
      this.page = 1;
      this.service.load().subscribe(() => {
      // Subscribe to login and logout observable
        this.authSubscription = this.securityService.authenticationChallenge$.subscribe(res => {
          this.authenticated = res;
        });
        this.loadData();
      });
    }

    loadData() {
        this.getBrands();
        this.getCatalog(6, 0);
        this.getTypes();
    }

    onFilterApplied(event: any) {
        event.preventDefault();
        this.getCatalog(this.items.PageSize, 0, this.brandSelected, this.typeSelected);
    }

    onBrandFilterChanged(event: any, value: number) {
        event.preventDefault();
        this.brandSelected = value;
    }

    onTypeFilterChanged(event: any, value: number) {
        event.preventDefault();
        this.typeSelected = value;
    }

    onPageChange() {
      this.getCatalog(this.items.PageSize, this.page - 1);
    }

    addToCart(item: IProduct) {
        this.basketService.addItemToBasket(item);
    }

    getCatalog(pageSize: number, pageIndex: number, brand?: number, type?: number) {
        this.errorReceived = false;
        this.service.getCatalog(pageIndex, pageSize, brand, type)
            .catch((err) => this.handleError(err))
            .subscribe(catalog => {
                this.items = catalog;
        });
    }

    getTypes() {
        this.service.getTypes().subscribe(types => {
            this.types = types;
            const alltypes: ICategory = { Id: null, Name: 'All', InActive: false };
            this.types.unshift(alltypes);
        });
    }

    getBrands() {
        this.service.getBrands().subscribe(brands => {
            this.brands = brands;
            const allBrands: IBrand = { Id: null, Name: 'All', InActive: false };
            this.brands.unshift(allBrands);
        });
    }

    private handleError(error: any) {
        this.errorReceived = true;
        return Observable.throw(error);
    }

    detail(item: IProduct) {
      this.router.navigate(['productdetail/' + item.Id]);
    }

}

