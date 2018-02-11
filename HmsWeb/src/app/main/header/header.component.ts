import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../store/shared/services/security.service';
import { Subscription } from 'rxjs/Subscription';
import { IIdentity } from '../../store/shared/models/identity.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isActive = true;
  public isAdmin: boolean = false;
  public authenticated: boolean = false;
  private subscription: Subscription;
  private userName: string = '';

  constructor(private service: SecurityService) { }

  ngOnInit() {
    this.subscription = this.service.authenticationChallenge$.subscribe(res => {
      this.authenticated = res;
      this.isAdmin = this.service.IsAdmin;
      this.userName = this.service.UserData.email;
    });

    if (window.location.hash) {
        this.service.AuthorizedCallback();
    }

    this.authenticated = this.service.IsAuthorized;

    if (this.authenticated) {
      this.isAdmin = this.service.IsAdmin;
        if (this.service.UserData) {
            this.userName = this.service.UserData.email;
        }
    }
  }

  menu() {
    this.isActive = !this.isActive;
  }

  logout() {
    this.service.Signoff();
  }

  login() {
    this.service.Authorize();
  }

}
