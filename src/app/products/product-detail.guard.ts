import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot, //contains information about the route anyTime
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const id=Number(route.paramMap.get('id'));//get the current id of the URL
      if(isNaN(id)||id<1){
        alert('Invalid id data');
        this.router.navigate(['/products'])
        return false;
      }
    return true;
  }
  
}
