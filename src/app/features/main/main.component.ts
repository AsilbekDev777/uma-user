import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {Router} from '@angular/router';

declare const ymaps: any;
@Component({
  selector: 'app-home',
  templateUrl: './main.component.html',
  imports: [
    NzCardComponent,
    NzIconDirective,
    NzButtonComponent
  ]
})

export class HomeComponent implements OnInit {

  constructor(private router:Router) {
  }

  ngOnInit(): void {
    ymaps.ready(() => {
      const map = new ymaps.Map('map', {
        center: [41.2995, 69.2401],
        zoom: 12
      });
    });
  }

  goToBuy(){
    this.router.navigate(['checkout']);
  }
  details():void {
      this.router.navigate(['product']);
  }
}
