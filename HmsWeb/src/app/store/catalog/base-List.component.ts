import { ICrud, IPage } from '../shared/models/pagination.model';
import { OnInit, Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { SecurityService } from '../shared/services/security.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BaseListComponent<T extends ICrud> implements OnInit {
  pageTitle: string = 'NEED TO SET THIS';
  items: IPage<T> = {
    Count: 0,
    PageIndex: 0,
    PageSize: 10,
    Data: [],
  };

  ready: boolean = false;

  page: number = 0;
  authenticated: boolean = false;
  authSubscription: Subscription;
  errorReceived: boolean;

  constructor(
    protected service: BaseService<T>,
    private securityService: SecurityService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.authenticated = securityService.IsAuthorized;
  }

  ngOnInit() {
    // Configuration Settings:
    this.service.load().subscribe(() => {
      this.loadData();
    });

    // Subscribe to login and logout observable
    this.authSubscription = this.securityService.authentication$.subscribe(
      res => {
        this.authenticated = res;
      }
    );
  }

  loadData() {
    this.ready = true;
  }

  getItems(pageSize: number, pageIndex: number) {
    this.service.getPage(pageIndex, pageSize, true).subscribe(items => {
      this.items = items;
      this.page = items.PageIndex + 1;
    });
  }

  private handleError(error: any) {
    this.errorReceived = true;
    return Observable.throw(error);
  }

  onDetail(item: T) {
    this.router.navigate(['./' + item.Id], {relativeTo: this.route});
  }

  onNew() {
    this.router.navigate(['./-1'], {relativeTo: this.route});
  }

  onDelete(item: T) {
    this.service.deleteItem(item).subscribe(() => {
      this.getItems(this.items.PageSize, this.page - 1);
    });
  }

  onPageChange() {
    if (this.ready) {
      this.getItems(this.items.PageSize, this.page - 1);
    }
  }

  onToggle(item: T) {
    item.InActive = !item.InActive;
    this.service.updateItem(item).subscribe();
  }

}
