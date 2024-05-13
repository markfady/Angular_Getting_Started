import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './products';
import { ProductService } from './product.service';

@Component({
  //selector: 'pm-product-detail', //we only need selector if we will nest this component 
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  errorMessage=''
  product: IProduct | undefined;
  constructor(private route:ActivatedRoute, private router:Router,private productService:ProductService) { 


  } //ActivatedRoute to read the URL and get the parameter , to display clicked product Info

  ngOnInit(): void { //initiated when component initialized (Like useEffect)
    const id=Number(this.route.snapshot.paramMap.get('id')); //parameter(will not change so we use snapshot)


      if(id){
        this.getProduct(id);
        console.log(id)
      }

  }
  
  getProduct(id: number): void {
    this.productService.getProducts().subscribe(
      (products) => {
        const product = products.find(p => p.id === id);
        if (product) {
          this.product = product;
        } else {
          this.errorMessage = 'Product not found';
        }
      },
      (error) => {
        this.errorMessage = 'Error fetching products';
        console.error(error);
      }
    );
  }

  onBack():void{
    this.router.navigate(['/products']);
  }

}
