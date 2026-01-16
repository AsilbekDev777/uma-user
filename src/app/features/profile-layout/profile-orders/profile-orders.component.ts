import {Component} from '@angular/core';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-profile-orders',
  templateUrl: './profile-orders.component.html',
  imports: [
    NzTableComponent,
    NgClass
  ]
})

export class ProfileOrdersComponent {

}
