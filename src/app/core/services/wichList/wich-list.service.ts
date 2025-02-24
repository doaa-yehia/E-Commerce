import { IProduct } from './../../../shared/interfaces/iproduct';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WichListService {

  constructor(private httpClient:HttpClient) { }
// result!:IProduct[];
// getwishListIds(){
// return this.httpClient.get(environment.baseUrl+`/api/v1/wishlist`).pipe(
//   map( (result:any[])=>{
//     let productIds:string[]=[]
//     result.forEach(element => {
//       productIds.push(element._id)
//     });
//     return productIds;
//   } )
// )

// }
wishListIds:WritableSignal<string[]>=signal([]);
  
  addToWishList(id:string):Observable<any>{
    return this.httpClient.post(environment.baseUrl+`/api/v1/wishlist`,
      {
       "productId": id,
      }
    );
  }

  removeFromWishList(id:string):Observable<any>{
    return this.httpClient.delete(environment.baseUrl+`/api/v1/wishlist/${id}`);
  }

  getLoggedWishList():Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/api/v1/wishlist`);
  }
}
