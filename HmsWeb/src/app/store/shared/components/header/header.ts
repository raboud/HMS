import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-header2',
    templateUrl: './header.html',
    styleUrls: ['./header.scss']
})
export class Header2Component {
    @Input()
    url: string;
}
