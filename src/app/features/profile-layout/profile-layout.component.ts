import {Component} from '@angular/core';
import {NzContentComponent, NzHeaderComponent, NzLayoutComponent, NzSiderComponent} from 'ng-zorro-antd/layout';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {SvgIconComponent} from '../../../shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-profile-layout',
  templateUrl: 'profile-layout.component.html',
  styleUrl: 'profile-layout.component.css',
  standalone: true,
  imports: [
    NzLayoutComponent,
    NzSiderComponent,
    NzHeaderComponent,
    NzContentComponent,
    RouterOutlet,
    SvgIconComponent,
    RouterLink,
    RouterLinkActive
  ]
})

export class ProfileLayoutComponent {

  constructor(private router: Router) {
  }


  goBack():void{
    this.router.navigate(['']);
  }
  goCard(){
    this.router.navigate(['card']);
  }
  public items: any = [
    {label: 'Account Info', icon: 'acc-info', activeIcon: 'acc-info-active', path: 'info'},
    {label: 'Orders', icon: 'orders', activeIcon: 'orders-active', path: 'orders'},
    {label: 'Notifications', icon: 'notifications', activeIcon: 'notifications-active', path: 'notifications'},
    {label: 'Feedback', icon: 'feedback', activeIcon: 'feedback-active', path: 'feedback'},
  ]
}
