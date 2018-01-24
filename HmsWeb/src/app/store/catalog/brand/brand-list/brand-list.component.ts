import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../catalog.service';
import { ConfigurationService } from '../../../shared/services/configuration.service';
import { SecurityService } from '../../../shared/services/security.service';
import { IBrand, IBrandPage } from '../../../shared/models/brand.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { IPager } from '../../../shared/models/pager.model';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {
  page: number;
  brands: IBrandPage = {
    Count: 0,
    PageIndex: 0,
    PageSize: 10,
    Data: [],
  }
  authenticated: boolean = false;
  authSubscription: Subscription;
  errorReceived: boolean;

  constructor(
    private service: CatalogService,
    private configurationService: ConfigurationService,
    private securityService: SecurityService
  ) {
    this.authenticated = securityService.IsAuthorized;

    this.brands.Count = 0;
    this.brands.PageIndex = 0;
    this.brands.PageSize = 10;
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
    this.authSubscription = this.securityService.authenticationChallenge$.subscribe(
      res => {
        this.authenticated = res;
      }
    );
  }

  loadData() {
    this.getBrands(10, 0);
  }

  getBrands(pageSize: number, pageIndex: number) {
    this.service.getBrandsPage(pageSize, pageIndex, true).subscribe(brands => {
      this.brands = brands;
      this.page = brands.PageIndex + 1;
    });
  }

  private handleError(error: any) {
    this.errorReceived = true;
    return Observable.throw(error);
  }

  detail(item: IBrand) {
    console.log(item.Name);
  }

}
