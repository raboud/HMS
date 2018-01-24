import { Component, OnInit } from '@angular/core';
import { ICategoryPage, ICategory } from '../../../shared/models/category.model';
import { Subscription } from 'rxjs';
import { CatalogService } from '../../catalog.service';
import { ConfigurationService } from '../../../shared/services/configuration.service';
import { SecurityService } from '../../../shared/services/security.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css']
})
export class TypeListComponent implements OnInit {
  page: number = 0;
  items: ICategoryPage = {
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
    private securityService: SecurityService,
    private router: Router
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
    this.authSubscription = this.securityService.authenticationChallenge$.subscribe(
      res => {
        this.authenticated = res;
      }
    );
  }

  loadData() {
//    this.getItems(0, 10);
  }

  getItems(pageSize: number, pageIndex: number) {
    this.service.getCategoyPage(pageIndex, pageSize, true).subscribe(items => {
      console.log(items);
      this.items = items;
      this.page = items.PageIndex + 1;
    });
  }

  private handleError(error: any) {
    this.errorReceived = true;
    return Observable.throw(error);
  }

  detail(item: ICategory) {
    console.log(item.Name);
  }

  delete(item: ICategory) {
    this.service.deleteCategory(item).subscribe(() => {;
      this.getItems(this.items.PageSize, this.page - 1);
    });
  }

  toggle(item: ICategory) {
    item.InActive = !item.InActive;
    this.service.updateCategory(item).subscribe();
  }

  pageChange() {
    console.log('pageChange');
    this.getItems(this.items.PageSize, this.page - 1);
  }

}
