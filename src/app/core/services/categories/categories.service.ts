import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient:HttpClient) { }
  
  private $categories:Observable<any>|null=null;

  getAllCategoriesWithShareReblay():Observable<any>{
    if(!this.$categories){
      this.$categories=this.httpClient.get(`${environment.baseUrl}/api/v1/categories`).pipe(
        shareReplay(1)
      )
    }
    return this.$categories;
  }
  getSpecificCategories(id:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories/${id}`)
  }


}
