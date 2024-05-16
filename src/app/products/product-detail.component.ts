import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct, ProductResolved } from './products';
import { ProductService } from './product.service';

@Component({
  //selector: 'pm-product-detail', //we only need selector if we will nest this component 
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  errorMessage=''
  product: IProduct | undefined;
  pageTitle = 'Product Detail';
  constructor(private route:ActivatedRoute, private router:Router,private productService:ProductService) { 


  } //ActivatedRoute to read the URL and get the parameter , to display clicked product Info

  ngOnInit(): void {
    const resolvedData: ProductResolved =
      this.route.snapshot.data['resolvedData'];
    this.errorMessage = resolvedData.error;
    this.onProductRetrieved(resolvedData.product);
  }

  onProductRetrieved(product: IProduct): void {this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }
  
  

  onBack():void{
    this.router.navigate(['/products']);
  }

}
