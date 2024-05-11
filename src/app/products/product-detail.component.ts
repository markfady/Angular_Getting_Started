import { Component, OnInit } from '@angular/core';

@Component({
  //selector: 'pm-product-detail', //we only need selector if we will nest this component 
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle:string='Product Details'
  constructor() { }

  ngOnInit(): void {
  }

}
