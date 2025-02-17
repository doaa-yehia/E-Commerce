import { environment } from '../../../shared/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 
  constructor(private _HttpClient: HttpClient) { }

  AddProdutCart(id: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        "productId": id,
      }
    )
  };
  getLoggedUseCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`)
  };
  removeSpacificProdCart(prodId:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${prodId}`,
      
    )
  };
  apdateCartQuantity(id:string,newCount:number):Observable<any>{
    return this._HttpClient.put(environment.baseUrl + `/api/v1/cart/${id}`,
      {
        "count": newCount,
      }
    )
  };
  clearCart():Observable<any>{
    return this._HttpClient.delete(environment.baseUrl + `/api/v1/cart`,
      
    )
  }

}
