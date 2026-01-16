import {Component, OnInit} from '@angular/core';
import {NzContentComponent, NzFooterComponent, NzHeaderComponent, NzLayoutComponent} from 'ng-zorro-antd/layout';
import {Router, RouterOutlet} from '@angular/router';
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: 'layout.css',
  imports: [
    NzLayoutComponent,
    NzHeaderComponent,
    NzContentComponent,
    NzFooterComponent,
    NzIconDirective,
    RouterOutlet
  ]
})

export class LayoutComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  goProfile() {
    this.router.navigate(['profile/info']);
  }

  goCard(){
    this.router.navigate(['card']);
  }
  search(){
    this.router.navigate(['search']);
  }
}
