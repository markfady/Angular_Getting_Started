import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { IProduct } from "./products";
import { ProductService } from "./product.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductResolver implements Resolve<IProduct>{
    constructor(private productService: ProductService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> {
       
            const id = Number(route.paramMap.get('id')) ;
            return this.productService.getProduct(id);
     
    
        }
    }

