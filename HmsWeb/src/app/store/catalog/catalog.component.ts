import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CatalogService } from './catalog.service';
import { ConfigurationService } from '../shared/services/configuration.service';
import { IProducts, IProduct, IProductPage } from '../shared/models/product.model';
import { ICategory } from '../shared/models/category.model';
import { IBrand } from '../shared/models/brand.model';
import { IPager } from '../shared/models/pager.model';
import { BasketWrapperService} from '../shared/services/basket.wrapper.service';
import { SecurityService } from '../shared/services/security.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'esh-catalog .esh-catalog',
    styleUrls: ['./catalog.component.scss'],
    templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit {
    brands: IBrand[] = [];
    types: ICategory[] = [];
    catalog: IProductPage;
    brandSelected: number;
    typeSelected: number;
    paginationInfo: IPager;
    authenticated: boolean = false;
    authSubscription: Subscription;
    errorReceived: boolean;

    constructor(
      private service: CatalogService,
      private basketService: BasketWrapperService,
      private configurationService: ConfigurationService,
      private securityService: SecurityService
    ) {
        this.authenticated = securityService.IsAuthorized;
    }

    ngOnInit() {

        // Configuration Settings:
        if (this.configurationService.isReady) {
            this.loadData();
        } else {
            this.configurationService.settingsLoaded$.subscribe(x => {
                this.loadData();
            });
          }

        // Subscribe to login and logout observable
        this.authSubscription = this.securityService.authenticationChallenge$.subscribe(res => {
            this.authenticated = res;
        });
    }

    loadData() {
        this.getBrands();
        this.getCatalog(10, 0);
        this.getTypes();
    }

    onFilterApplied(event: any) {
        event.preventDefault();
        this.getCatalog(this.paginationInfo.itemsPage, this.paginationInfo.actualPage, this.brandSelected, this.typeSelected);
    }

    onBrandFilterChanged(event: any, value: number) {
        event.preventDefault();
        this.brandSelected = value;
    }

    onTypeFilterChanged(event: any, value: number) {
        event.preventDefault();
        this.typeSelected = value;
    }

    onPageChanged(value: any) {
        console.log('catalog pager event fired' + value);
        event.preventDefault();
        this.paginationInfo.actualPage = value;
        this.getCatalog(this.paginationInfo.itemsPage, value);
    }

    addToCart(item: IProduct) {
        this.basketService.addItemToBasket(item);
    }

    getCatalog(pageSize: number, pageIndex: number, brand?: number, type?: number) {
        this.errorReceived = false;
        this.service.getCatalog(pageIndex, pageSize, brand, type)
            .catch((err) => this.handleError(err))
            .subscribe(catalog => {
                this.catalog = catalog;
                this.paginationInfo = {
                    actualPage : catalog.pageIndex,
                    itemsPage : catalog.pageSize,
                    totalItems : catalog.count,
                    totalPages: Math.ceil(catalog.count / catalog.pageSize),
                    items: catalog.pageSize
                };
        });
    }

    getTypes() {
        this.service.getTypes().subscribe(types => {
            this.types = types;
            const alltypes: ICategory = { id: null, name: 'All', inActive: false };
            this.types.unshift(alltypes);
            console.log('types ' + this.types.length);
        });
    }

    getBrands() {
        this.service.getBrands().subscribe(brands => {
            this.brands = brands;
            console.log('brands ' + this.brands.length);
            const allBrands: IBrand = { id: null, name: 'All', inActive: false };
            this.brands.unshift(allBrands);
        });
    }

    private handleError(error: any) {
        this.errorReceived = true;
        return Observable.throw(error);
    }

    detail(item: IProduct) {
      console.log(item.name);
    }

}

