import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isActive = true;

  constructor() { }

  ngOnInit() {
  }

  menu() {
    console.log('menu ' + this.isActive);
    this.isActive = !this.isActive;
  }

}
