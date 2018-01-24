import { Component, OnInit } from '@angular/core';
import { ICategoryPage, ICategory } from '../../../shared/models/category.model';
import { Subscription } from 'rxjs';
import { CatalogService } from '../../catalog.service';
import { ConfigurationService } from '../../../shared/services/configuration.service';
import { SecurityService } from '../../../shared/services/security.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css']
})
export class TypeListComponent implements OnInit {
  page: number;
  items: ICategoryPage = {
    count: 0,
    pageIndex: 0,
    pageSize: 10,
    data: [],
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

    this.items.count = 0;
    this.items.pageIndex = 0;
    this.items.pageSize = 10;
    this.items.data = [];
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
    this.getItems(0, 10);
  }

  getItems(pageSize: number, pageIndex: number) {
    this.service.getCategoyPage(pageIndex, pageSize, true).subscribe(items => {
      this.items = items;
      this.page = items.pageIndex + 1;
    });
  }

  private handleError(error: any) {
    this.errorReceived = true;
    return Observable.throw(error);
  }

  detail(item: ICategory) {
    console.log(item.name);
  }

  pageChange() {
    this.getItems(this.items.pageSize, this.page - 1);
  }

}
