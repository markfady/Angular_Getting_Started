import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { ProductEditComponent } from "./product-edit.component";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class ProductEditGuard implements CanDeactivate<ProductEditComponent>{ //Implement guard as service so we must use Injectable
    canDeactivate(component: ProductEditComponent):Observable<boolean> | Promise<boolean> | boolean { //return boolean
        if(component.productForm.dirty){
            const productName=component.productForm.get('productName')?.value||'New Product';
            return confirm(`Navigate away and lose all changes to ${productName} `)
        }
        return true
    }
}