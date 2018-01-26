import { Component } from '@angular/core';
import { ConfigurationService } from '../../../shared/services/configuration.service';
import { SecurityService } from '../../../shared/services/security.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IVendor } from '../../../shared/models/vendor.model';
import { IPage } from '../../../shared/models/pagination.model';
import { VendorService } from '../../vendor.service';
import { BaseListComponent } from '../../base-List.component';

@Component({
  selector: 'app-vendor-list',
  templateUrl: '../../type/type-list/type-list.component.html',
  styleUrls: ['../../type/type-list/type-list.component.css']
})
export class VendorListComponent extends BaseListComponent<IVendor> {
  constructor (
    service: VendorService,
    configurationService: ConfigurationService,
    securityService: SecurityService,
    router: Router,
    route: ActivatedRoute
  ) {
    super(service, configurationService, securityService, router, route);
    this.pageTitle = 'Vendor List';
  }
}
/*
export class VendorListComponent implements OnInit {
  pageTitle: string = "Vendor List";
  items: IPage<IVendor> = {
    Count: 0,
    PageIndex: 0,
    PageSize: 10,
    Data: []
  };

  page: number = 0;
  authenticated: boolean = false;
  authSubscription: Subscription;
  errorReceived: boolean;
  ready: boolean = false;

  constructor(
    private service: CatalogService,
    private configurationService: ConfigurationService,
    private securityService: SecurityService,
    private router: Router,
    private route: ActivatedRoute
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
    this.ready = true;
  }

  getItems(pageSize: number, pageIndex: number) {
    if (this.ready) {
      this.service.getVendorPage(pageIndex, pageSize, true).subscribe(items => {
        this.items = items;
        this.page = items.PageIndex + 1;
      });
    }
  }

  private handleError(error: any) {
    this.errorReceived = true;
    return Observable.throw(error);
  }

  onDetail(item: IVendor) {
    this.router.navigate(["./" + item.Id], { relativeTo: this.route });
  }

  onNew() {
    this.router.navigate(["./-1"], { relativeTo: this.route });
  }

  onDelete(item: IVendor) {
    this.service.deleteCategory(item).subscribe(() => {
      this.getItems(this.items.PageSize, this.page - 1);
    });
  }

  onPageChange() {
    this.getItems(this.items.PageSize, this.page - 1);
  }

  onToggle(item: IVendor) {
    item.InActive = !item.InActive;
    this.service.updateCategory(item).subscribe();
  }
}
*/
