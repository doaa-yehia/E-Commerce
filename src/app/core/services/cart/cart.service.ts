import { environment } from '../../../shared/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 
  givenToken:any=localStorage.getItem("userToken");
  constructor(private _HttpClient: HttpClient) { }

  AddProdutCart(id: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        "productId": id
      },
      {
        headers:
        {
          token:this.givenToken
        }
      }
    )
  };
  getLoggedUseCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`,
      {
        headers:
        {
          token:this.givenToken
        }
      }
    )
  };
  removeSpacificProdCart(prodId:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${prodId}`,
      {
        headers:
        {
          token:this.givenToken
        }
      }
    )
  };
  apdateCartQuantity(id:string,newCount:number):Observable<any>{
    return this._HttpClient.put(environment.baseUrl + `/api/v1/cart/${id}`,
      {
        "count": newCount
      },
      {
        headers:{
          token:this.givenToken,
        }
      }
    )
  };
  clearCart():Observable<any>{
    return this._HttpClient.delete(environment.baseUrl + `/api/v1/cart`,
      {
        headers:{
          token:this.givenToken,
        }
      }
    )
  }

}
