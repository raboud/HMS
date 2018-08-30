import { Title } from '@angular/platform-browser';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

import { DataService } from './shared/services/data.service';
import { SecurityService } from './shared/services/security.service';
import { ConfigurationService } from './shared/services/configuration.service';

/*
 * App Component
 * Top Level Component
 */

@Component({
    selector: 'app-2',
    styleUrls: ['./store.component.scss'],
    templateUrl: './store.component.html'
})
export class StoreComponent implements OnInit {
    Authenticated: boolean = false;
    subscription: Subscription;

    constructor(private titleService: Title, private securityService: SecurityService, private configurationService: ConfigurationService) {
        this.Authenticated = this.securityService.IsAuthorized;
    }

    ngOnInit() {
        // Get configuration from server environment variables:
        this.configurationService.load().subscribe(() => {
          this.subscription = this.securityService.authentication$.subscribe(res => this.Authenticated = res);
        });
    }

    public setTitle(newTitle: string) {
        this.titleService.setTitle('eShopOnContainers');
    }
}
