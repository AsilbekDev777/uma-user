import {Component} from '@angular/core';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzButtonComponent} from 'ng-zorro-antd/button';

@Component({
  templateUrl:'auth.component.html',
  imports: [
    NzInputDirective,
    NzIconDirective,
    NzButtonComponent
  ],
  standalone:true
})

export class AuthComponent {

}
