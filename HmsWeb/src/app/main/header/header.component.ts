import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isActive = true;

  public isAuthenticated: boolean = false;
  public isAdmin: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  menu() {
    this.isActive = !this.isActive;
  }

  logout() {
  }

}
