import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProduct } from "./products";
import { ProductService } from "./product.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls:['./product-list.component.css']
})

export class ProductListComponent implements OnInit ,OnDestroy {
    pageTitle:string='Product List!';
    imageWidth:number=50;
    imageMargin:number=2;
    showStatus:boolean=false;
    errorMessage:string='';
    filteredProduct:IProduct[]=[]
    sub!:Subscription ; // ! mean we will handle this value later , no need to set it now
    private _listFilter:string=''

    products:IProduct[]= []//Empty array to store data from service inside it

  //Start set data to filteredProduct
  
  //set data of products array that came from the service to filteredProduct 
    get listFilter():string{
      return this._listFilter
    }
    set listFilter(value:string){
      this._listFilter=value;
      console.log('In setter:', value)
      this.filteredProduct=this.performFilter(value) //first we pass the value from text box 
    }
   
    performFilter(filterBy:string):IProduct[]{ 
      filterBy=filterBy.toLocaleLowerCase() //second we set data came from text box to lowerCase
      return this.products.filter((product:IProduct)=>{ //third we select our products array to start comparison between it and our text box
        return product.productName.toLocaleLowerCase().includes(filterBy) //fourth we first lowerCase our product names to be matching comparison , then we check if text box value in our product list so we filter it
      })
    }
    //End set data to filteredProduct

  // start get data from the service by subscribe //
    ngOnInit(): void {
    this.sub=this.productService.getProducts().subscribe({ 
      next:productsData=>{  //curly braces cause more than one line inside the next notification
      this.products=productsData;
      this.filteredProduct=this.products;
      },
      error:err=>this.errorMessage=err
    }); 
    }
    ngOnDestroy(): void {
      this.sub.unsubscribe()
    }
    // End  get data from the service by subscribe //

      //send data from star children to parent product-list using emit , and when you use emit you must define it's function here
      onRatingClicked(message:string):void{
        this.pageTitle='Product List:'+message;
      }
      //start show/hide Image status
    toggleImage():void{
      this.showStatus=!this.showStatus
    }
      //end show/hide Image status

    constructor(private productService:ProductService){ //Inject get from http through angular
    }
}