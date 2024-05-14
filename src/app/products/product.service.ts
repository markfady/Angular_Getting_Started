import { Injectable } from "@angular/core";
import { IProduct } from "./products";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable,catchError,map,of,tap, throwError } from "rxjs";

@Injectable({
    providedIn:'root'
})
 //a service to only get the products data so we can call it when we want , better than putting the hardcoded data in each component
export class ProductService{
  // private productUrl= 'api/products/products.json'
    private productUrl= 'api/products'
    constructor(private http:HttpClient){}

    getProducts():Observable<IProduct[]>{
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data=>console.log('all',JSON.stringify(data))), //convert array of object to JSON string
            catchError(this.handleError)
        );
    }   
    
    getProduct(id: number): Observable<IProduct> {
      if (id === 0) {
        return of(this.initializeProduct());
      }
      const url = `${this.productUrl}/${id}`;
      return this.http.get<IProduct>(url)
        .pipe(
          tap(data => console.log('getProduct: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }
    updateProduct(product: IProduct): Observable<IProduct> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const url = `${this.productUrl}/${product.id}`;
      return this.http.put<IProduct>(url, product, { headers })
        .pipe(
          tap(() => console.log('updateProduct: ' + product.id)),
          // Return the product on an update
          map(() => product),
          catchError(this.handleError)
        );
    }
  
    createProduct(product: IProduct): Observable<IProduct> {
      let httpheaders=new HttpHeaders()  
   
      .set('Content-type','application/Json');  
      let options={  
        headers:httpheaders  
      };  
      return this.http.post<IProduct>(this.productUrl, product, options)
    } 
    private handleError(err: HttpErrorResponse): Observable<never> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(() => errorMessage);
      }
      private initializeProduct(): IProduct {
        // Return an initialized object
        return {
          id:0,
          productName: '',
          productCode: '',
          releaseDate: '',
          price: 0,
          description: '',
          starRating: 0,
          imageUrl: '',
        };
}
}