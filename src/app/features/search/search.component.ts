import {Component, OnInit} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {NzFooterComponent} from 'ng-zorro-antd/layout';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl:'search.component.css',
  imports: [
    NzButtonComponent,
    NzIconDirective,
    NzInputDirective,
    FormsModule,
    NzFooterComponent
  ]
})

export class SearchComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit() {
  }


  search = '';
  activeCategory = 'All';

  categories = [
    'All',
    'Cereal',
    'Fruits',
    'Vegetables',
    'Spices',
    'Dairy',
    'Chicken',
    'Meat'
  ];

  products = Array.from({length: 10}).map(() => ({
    name: 'Orange',
    image: 'assets/orange.png'
  }));

  selectCategory(cat: string) {
    this.activeCategory = cat;
  }
  goProfile() {
    this.router.navigate(['profile/info']);
  }
  goBack(): void {
    this.router.navigate(['']);
  }
}
