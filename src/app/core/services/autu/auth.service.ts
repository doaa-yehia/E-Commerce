import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';
import { jwtDecode } from "jwt-decode";
import { IToken } from '../../../shared/interfaces/itoken';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:IToken={} as IToken;

  constructor(private httpClient:HttpClient, private _Router:Router) { }

  getSingUp(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
  }

  getSingIn(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
  }

  getEmailVerify(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data);
  }

  getCodeVerify(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data);
  }

  getRepassword(data:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data);
  }

  getUserData():void{
    if(localStorage.getItem('userToken')!==null){
      this.userData= jwtDecode(localStorage.getItem('userToken') ! );
    }
    console.log(this.userData);
    
  }

  logOut():void{
    localStorage.removeItem('userToken');
    this.userData={} as IToken;
    this._Router.navigate(['/login']);

  }

}


