import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from './store/shared/services/configuration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private config: ConfigurationService) {
  }

  ngOnInit() {
    this.config.load().subscribe();
  }
}
