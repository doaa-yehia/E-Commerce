import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../shared/environment/environment';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {

  constructor(private httpClient:HttpClient) { }


  getAllSubCategoryOnCategory(id:string):Observable<any>{
    return this.httpClient.get(environment.baseUrl + `/api/v1/categories/${id}/subcategories`);
  }
  
}
