import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';

import brands from '@fortawesome/fontawesome-free-brands';
import regular from '@fortawesome/fontawesome-free-regular';
import solid from '@fortawesome/fontawesome-free-solid';
import { library } from '@fortawesome/fontawesome';

import { ConfigurationService } from './store/shared/services/configuration.service';
import { SecurityService } from './store/shared/services/security.service';
import { BasketStatusComponent} from './store/basket/basket-status/basket-status.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  Authenticated: boolean = false;
  subscription: Subscription;


  constructor(private titleService: Title, private securityService: SecurityService, private config: ConfigurationService) {
    this.Authenticated = this.securityService.IsAuthorized;

    library.add(solid);
    library.add(regular);
    library.add(brands);
  }

  ngOnInit() {
    console.log('app on init');
    this.subscription = this.securityService.authentication$.subscribe(res => this.Authenticated = res);
    this.config.load().subscribe();
  }
}
