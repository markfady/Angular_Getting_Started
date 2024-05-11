import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  //selector: 'pm-product-detail', //we only need selector if we will nest this component 
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle:string='Product Details'
  constructor(private route:ActivatedRoute) { } //ActivatedRoute to read the URL and get the parameter , to display clicked product Info

  ngOnInit(): void { //initiated when component initialized (Like useEffect)
    const id=Number(this.route.snapshot.paramMap.get('id')); //parameter(will not change so we use snapshot)
    this.pageTitle +=`product id = ${id} `
  }


}
