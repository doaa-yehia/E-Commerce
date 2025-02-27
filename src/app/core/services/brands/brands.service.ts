import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private readonly httpClient:HttpClient) { }

  private $brands:Observable<any>|null=null;
 
  getAllBrandsWithSharReplay():Observable<any>{
     if (!this.$brands) {
      this.$brands=this.httpClient.get(environment.baseUrl+`/api/v1/brands`).pipe(
        shareReplay(1)
      )
     }
     return this.$brands;
    }

  getSpecificBrand(id:string):Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/api/v1/brands/${id}`)
  }
}
