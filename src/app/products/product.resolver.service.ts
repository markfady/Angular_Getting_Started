import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


import { ProductService } from './product.service';
import { IProduct, ProductResolved } from './products';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductResolved> {

  constructor(private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<ProductResolved> {
    const id = Number(route.paramMap.get('id'));
    if (isNaN(id)) {
      const message = `Product id was not a number: ${id}`;
      console.error(message);
      return of({ product: null as unknown as IProduct, error: message });


    }

    return this.productService.getProduct(+id)
      .pipe(
        map(product => ({ product })),
        catchError(error => {
          const message = `Retrieval error: ${error}`;
          console.error(message);
          return of({ product: null as unknown as IProduct, error: message });
        })
      );
  }

}