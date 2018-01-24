import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { DataService } from '../shared/services/data.service';
import { ConfigurationService } from '../shared/services/configuration.service';
import { IProducts, IProductPage } from '../shared/models/product.model';
import { IBrand, IBrands, IBrandPage } from '../shared/models/brand.model';
import { ICategory, ICategories, ICategoryPage } from '../shared/models/category.model';
import { IVendors, IVendor } from '../shared/models/vendor.model';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';

@Injectable()
export class CatalogService {
    private catalogUrl: string = '';
    private brandUrl: string = '';
    private typesUrl: string = '';
    private vendorUrl: string = '';
    private unitUrl: string = '';

    constructor(private service: DataService, private configurationService: ConfigurationService) {
      console.log('CatalogService');
      this.configurationService.settingsLoaded$.subscribe(x => {
          console.log('config loaded');
            this.catalogUrl = this.configurationService.serverSettings.catalogUrl + '/api/v1/products/page';
            this.brandUrl = this.configurationService.serverSettings.catalogUrl + '/api/v1/brands';
            this.typesUrl = this.configurationService.serverSettings.catalogUrl + '/api/v1/categories';
        }, error => console.log(error));
    }

    getCatalog(pageIndex: number, pageSize: number, brand: number, type: number): Observable<IProducts> {
        let url = this.catalogUrl;
        url = url + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize;

        if (type) {
            url = url + '&catalogTypeId=' + ((type) ? type.toString() : 'null');
        }

        if (brand) {
          url = url + '&catalogBrandId=' + ((brand) ? brand.toString() : 'null');
      }

        return this.service.get<IProductPage>(url);
    }

    getBrandsPage(pageIndex: number, pageSize: number, all?: boolean): Observable<IBrandPage> {
      let url = this.brandUrl;
      url = url + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize;

      if (all) {
        url = url + '&all=' + all;
      }
      console.log(url);
      return this.service.get<IBrandPage>(url);
    }

    getBrands(all?: boolean): Observable<IBrand[]> {
      if (all) {
        return this.service.get<IBrand[]>(this.brandUrl + '?all=' + all);
      } else {
        return this.service.get<IBrand[]>(this.brandUrl);
      }
    }

    getTypes(all?: boolean): Observable<ICategory[]> {
        if (all) {
          return this.service.get<ICategory[]>(this.typesUrl + '?all=' + all);
        } else {
          return this.service.get<ICategory[]>(this.typesUrl);
        }
      }

      getCategoyPage(pageIndex: number, pageSize: number, all?: boolean): Observable<ICategoryPage> {
        let url = this.typesUrl + '/page' ;
        url = url + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize;

        if (all) {
          url = url + '&all=' + all;
        }
        console.log(url);
        return this.service.get<ICategoryPage>(url);
      }

      getCategory(id: number): Observable<ICategory> {
        let url = this.typesUrl ;
        url = url + '/' + id;
        console.log(url);
        return this.service.get<ICategory>(url);
      }

      updateCategory(item: ICategory) {
        return this.service.put(this.typesUrl + '/' + item.id, item);
      }

    getVendors(all?: boolean): Observable<IVendor[]> {
      if (all) {
        return this.service.get<IVendor[]>(this.vendorUrl + '/?all=' + all);
      } else {
        return this.service.get<IVendor[]>(this.vendorUrl);
      }
    }
}
