import { Component, OnInit, Input } from '@angular/core';
import { IMemeber } from '../models/memeber';

@Component({
  selector: 'app-staff-element',
  templateUrl: './staff-element.component.html',
  styleUrls: ['./staff-element.component.css']
})
export class StaffElementComponent implements OnInit {
  @Input() member: IMemeber;
  @Input() index: number;
  @Input() odd: boolean;
  @Input() even: boolean;

  constructor() {}

  ngOnInit() {
    console.log(this.index);
    console.log(this.odd);
    console.log(this.even);
  }

  get FullName(): string {
    if (this.member.Credentials) {
      return this.member.Name + ', ' + this.member.Credentials;
    }
    return this.member.Name;
  }
}
