import {Component} from '@angular/core';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzRadioComponent} from 'ng-zorro-antd/radio';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  imports: [
    NzIconDirective,
    NzButtonComponent,
    NzInputDirective,
    NzRadioComponent,
    FormsModule
  ]
})

export class CheckoutComponent {

  constructor(private router: Router) {}

  payment = 'cod';
  notes: string = '';

  items = [
    {
      name: 'Orange',
      qty: 1,
      price: 50,
      image: 'assets/orange.png'
    },
    {
      name: 'Watermelon',
      qty: 1,
      price: 50,
      image: 'assets/watermelon.png'
    }
  ];

  get subtotal(): number {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }
  goBack(): void {
    this.router.navigate(['']);
  }
}
