import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient:HttpClient) { }

  getAllCategories():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories`)
  }

  getSpecificCategories(id:string|null):Observable<any>{
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
  }


}
