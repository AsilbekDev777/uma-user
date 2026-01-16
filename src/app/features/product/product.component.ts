import {Component} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {Router} from '@angular/router';
import {NzFooterComponent} from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl:'product.component.css',
  imports: [
    NzButtonComponent,
    NzIconDirective,
    NzFooterComponent
  ]
})

export class ProductComponent {

  constructor(private router:Router) {}

  quantity = 1;

  product = {
    category: 'FRUITS',
    name: 'Orange',
    price: 50,
    image: 'assets/images/blueberry.png',
    seller: 'Marvin Ken Tumando',
    location: 'New Visayas',
    stock: 1234,
    shipping: 'Courier: 1–2 days, free shipping'
  };

  increase() {
    this.quantity++;
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  goCard(){
    this.router.navigate(['/card']);
  }
  goProfile(){
    this.router.navigate(['/profile']);
  }

  goBack(){
    this.router.navigate(['']);
  }
}
