import {Component} from '@angular/core';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzCheckboxComponent} from 'ng-zorro-antd/checkbox';
import {FormsModule} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  imports: [
    NzIconDirective,
    NzCheckboxComponent,
    FormsModule,
    NzButtonComponent
  ]
})

export class CardComponent {
  constructor(private router:Router) {
  }

  items = [
    {
      name: 'Orange',
      price: 50,
      quantity: 1,
      selected: false,
      image: 'assets/orange.png'
    },
    {
      name: 'Guava',
      price: 50,
      quantity: 1,
      selected: false,
      image: 'assets/guava.png'
    },
    {
      name: 'Watermelon',
      price: 50,
      quantity: 1,
      selected: false,
      image: 'assets/watermelon.png'
    }
  ];

  get subtotal(): number {
    return this.items
      .filter(i => i.selected)
      .reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  increase(item: any) {
    item.quantity++;
  }

  decrease(item: any) {
    if (item.quantity > 1) item.quantity--;
  }

  remove(item: any) {
    this.items = this.items.filter(i => i !== item);
  }

  goBack(){
    this.router.navigate(['']);
  }

}
