import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  template: `<div>
    <nav class='navbar navbar-expand navbar-light bg-light'>
        <a class='navbar-brand'>{{pageTitle}}</a>
        <ul class='nav nav-pills'>
          <li><a class='nav-link' routerLink='/welcome'>Home</a></li>
          <li><a class='nav-link' routerLink='/products'>Product List</a></li>
          <li><a class='nav-link' [routerLink]="['/products/0/edit']">Add Product</a></li>
          <li><a class='nav-link' routerLink='/ReactiveForm'>Form</a></li>
        </ul>
    </nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  </div>`,
})
export class AppComponent {
  pageTitle: string = 'Angular Getting Started';
}
