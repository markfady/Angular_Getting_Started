import { Component, OnInit } from "@angular/core";
import { IProduct } from "./products";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls:['./product-list.component.css']
})

export class ProductListComponent implements OnInit  {
    pageTitle:string='Product List!';
    imageWidth:number=50;
    imageMargin:number=2;
    showStatus:boolean=false;
    private _listFilter:string=''

    products:IProduct[]= [ //get data from service
    ]

    get listFilter():string{
      return this._listFilter
    }

    set listFilter(value:string){
      this._listFilter=value;
      console.log('In setter:', value)
      this.filteredProduct=this.performFilter(value) //first we pass the value from text box 
    }
    filteredProduct:IProduct[]=[]
   
    performFilter(filterBy:string):IProduct[]{ 
      filterBy=filterBy.toLocaleLowerCase() //second we set data came from text box to lowerCase
      return this.products.filter((product:IProduct)=>{ //third we select our products array to start comparison between it and our text box
        return product.productName.toLocaleLowerCase().includes(filterBy) //fourth we first lowerCase our product names to be matching comparison , then we check if text box value in our product list so we filter it
      })
    }
    ngOnInit(): void {
      this.products=this.productService.getProducts(); //get data from the service
      this.filteredProduct=this.products;
      //this.listFilter='cart';
    }

      //send data from star children to parent product-list using emet , and when you use emet you must define it's function here
      onRatingClicked(message:string):void{
        this.pageTitle='Product List:'+message;
      }

  
    toggleImage():void{
      this.showStatus=!this.showStatus
    }

    constructor(private productService:ProductService){

    }
}