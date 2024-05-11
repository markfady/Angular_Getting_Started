import { Injectable } from "@angular/core";
import { IProduct } from "./products";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable,catchError,tap, throwError } from "rxjs";

@Injectable({
    providedIn:'root'
})
 //a service to only get the products data so we can call it when we want , better than putting the hardcoded data in each component
export class ProductService{
    private productUrl= 'api/products/products.json'
    constructor(private http:HttpClient){

    }
    getProducts():Observable<IProduct[]>{
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data=>console.log('all',JSON.stringify(data))), //convert array of object to JSON string
            catchError(this.handleError)
        );
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
}