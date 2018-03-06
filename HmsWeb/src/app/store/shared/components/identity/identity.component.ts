import { Component, OnInit, OnChanges, Output, Input, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SecurityService } from '../../services/security.service';

@Component({
    selector: 'app-identity',
    templateUrl: './identity.component.html',
    styleUrls: ['./identity.component.scss']
})
export class IdentityComponent implements OnInit  {
    authenticated: boolean = false;
    private subscription: Subscription;
    private userName: string = '';

    constructor(private service: SecurityService) {

    }

    ngOnInit() {
        this.subscription = this.service.authentication$.subscribe(res => {
            this.authenticated = res;
            this.userName = this.service.UserData.email;
        });

        if (window.location.hash) {
            this.service.AuthorizedCallback();
        }

        this.authenticated = this.service.IsAuthorized;

        if (this.authenticated) {
            if (this.service.UserData) {
              this.userName = this.service.UserData.email;
            }
        }
    }

    logoutClicked(event: any) {
        event.preventDefault();
        this.logout();
    }

    login() {
        this.service.Authorize();
    }

    logout() {
        this.service.Logoff();
    }
}
