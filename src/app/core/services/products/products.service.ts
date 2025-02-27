import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private $products:Observable<any>|null=null;

  constructor(private _HttpClient:HttpClient) { }
  
  

  getAllProductsWithSareRePlay():Observable<any>{
    if (!this.$products) {
      this.$products=this._HttpClient.get<any>(`${environment.baseUrl}/api/v1/products`).pipe(
        shareReplay(1)
      )
    }
    return this.$products;
  }

  getSpecificProducts(id:string|null):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
  }


}
