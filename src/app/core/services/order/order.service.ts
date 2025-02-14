import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _HttpClient: HttpClient) { }
  givenToken: any = localStorage.getItem("userToken");

  getCheckOutSession(id: string, data: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + `/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        "shippingAddress": data,
      },
      {
        headers: {
          token: this.givenToken,
        }
      }

    )
  }
  getUserOrder(id:string):Observable<any>{
    return this._HttpClient.get(environment.baseUrl+`/api/v1/orders/user/${id}`)
  }
}
