import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

import { DataService } from '../shared/services/data.service';
import { ConfigurationService } from '../shared/services/configuration.service';
import { IProduct } from '../shared/models/product.model';
import { IBrand } from '../shared/models/brand.model';
import { ICategory, ICategories } from '../shared/models/category.model';
import { IVendor } from '../shared/models/vendor.model';
import { IPage } from '../shared/models/pagination.model';

@Injectable()
export class CatalogService {
  private catalogUrl = '';
  private brandUrl: string = '';
  private typesUrl = '';
  private vendorUrl = '';
  private unitUrl = '';

  constructor(
    private service: DataService,
    private configurationService: ConfigurationService
  ) {
    console.log('CatalogService');
    this.configurationService.settingsLoaded$.subscribe(
      x => {
        console.log('config loaded');
        this.catalogUrl = this.configurationService.serverSettings.catalogUrl + '/api/v1/products/page';
        this.brandUrl = this.configurationService.serverSettings.catalogUrl + '/api/v1/brands';
        this.typesUrl = this.configurationService.serverSettings.catalogUrl + '/api/v1/categories';
          this.vendorUrl = this.configurationService.serverSettings.catalogUrl + '/api/v1/vendors';
          this.unitUrl = this.configurationService.serverSettings.catalogUrl + '/api/v1/units';
      },
      error => console.log(error)
    );
  }

  getCatalog(
    pageIndex: number,
    pageSize: number,
    brand: number,
    type: number
  ): Observable<IPage<IProduct>> {
    let url = this.catalogUrl;
    url = url + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize;

    if (type) {
      url = url + '&catalogTypeId=' + (type ? type.toString() : 'null');
    }

    if (brand) {
      url = url + '&catalogBrandId=' + (brand ? brand.toString() : 'null');
    }

    return this.service.get<IPage<IProduct>>(url);
  }

  getBrandsPage(
    pageIndex: number,
    pageSize: number,
    all?: boolean
  ): Observable<IPage<IBrand>> {
    let url = this.brandUrl;
    url = url + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize;

    if (all) {
      url = url + '&all=' + all;
    }
    console.log(url);
    return this.service.get<IPage<IBrand>>(url);
  }

  getBrands(all?: boolean): Observable<IBrand[]> {
    if (all) {
      return this.service.get<IBrand[]>(this.brandUrl + '?all=' + all);
    } else {
      return this.service.get<IBrand[]>(this.brandUrl);
    }
  }

  getBrand(id: number): Observable<IBrand> {
    let url = this.brandUrl;
    url = url + '/' + id;
    console.log(url);
    return this.service.get<ICategory>(url);
  }

  updateBrand(item: IBrand) {
    return this.service.put(this.brandUrl + '/' + item.Id, item);
  }

  createBrand(item: IBrand) {
    return this.service.post(this.brandUrl, item);
  }

  deleteBrand(item: IBrand): Observable<boolean> {
    return this.service.delete(this.brandUrl + '/' + item.Id);
  }

  getTypes(all?: boolean): Observable<ICategory[]> {
    let url = this.typesUrl;
    if (all) {
      url += '/?all=' + all;
    }
    return this.service.get<ICategory[]>(url);
  }

  getCategoyPage(
    pageIndex: number,
    pageSize: number,
    all?: boolean
  ): Observable<IPage<ICategory>> {
    let url = this.typesUrl + '/page';
    url = url + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize;

    if (all) {
      url = url + '&all=' + all;
    }
    console.log(url);
    return this.service.get<IPage<ICategory>>(url);
  }

  getCategory(id: number): Observable<ICategory> {
    let url = this.typesUrl;
    url = url + '/' + id;
    console.log(url);
    return this.service.get<ICategory>(url);
  }

  updateCategory(item: ICategory) {
    return this.service.put(this.typesUrl + '/' + item.Id, item);
  }

  createCategory(item: ICategory) {
    return this.service.post(this.typesUrl, item);
  }

  deleteCategory(item: ICategory): Observable<boolean> {
    return this.service.delete(this.typesUrl + '/' + item.Id);
  }

  getVendors(all?: boolean): Observable<IVendor[]> {
    let url = this.vendorUrl;
    if (all) {
      url += '/?all=' + all;
    }
    return this.service.get<IVendor[]>(url);
  }


  getVendorPage(
    pageIndex: number,
    pageSize: number,
    all?: boolean
  ): Observable<IPage<IVendor>> {
    let url = this.vendorUrl + '/page';
    url = url + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize;

    if (all) {
      url = url + '&all=' + all;
    }
    console.log(url);
    return this.service.get<IPage<IVendor>>(url);
  }

  getVendor(id: number): Observable<IVendor> {
    let url = this.vendorUrl;
    url = url + '/' + id;
    console.log(url);
    return this.service.get<IVendor>(url);
  }

  updateVendor(item: IVendor) {
    return this.service.put(this.vendorUrl + '/' + item.Id, item);
  }

  createVendor(item: IVendor) {
    return this.service.post(this.vendorUrl, item);
  }

  deleteVendor(item: IVendor): Observable<boolean> {
    return this.service.delete(this.vendorUrl + '/' + item.Id);
  }

}
