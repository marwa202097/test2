import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http'
import {  Observable ,BehaviorSubject } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor( private _HttpClient:HttpClient) { }
baseUrl:string='https://routeegypt.herokuapp.com/'


  signUp(data:any):Observable<any>
  {
   return this._HttpClient.post(this.baseUrl+'signup',data)
  }


  signIn(data:any)
  {
    return  this._HttpClient.post(this.baseUrl+'signin',data)
  }

  signOut(data:any)
  {
    return  this._HttpClient.post(this.baseUrl+'signOut',data)
  }
  isLoggedIn():boolean
  {
   return !! localStorage.getItem('token')
  }
}
