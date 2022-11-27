import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

const AUTH_API = 'http://localhost:8080/api/auth';
const AUTH_API2 = 'http://localhost:8080/api/auth/signin';

const headers = { 'content-type': 'application/json'}  ;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  principal: any = {
    username: null, password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;

  constructor(private http: HttpClient) { }
  
  login2(username: String, password: String): Observable<any> {
    return this.http.post(AUTH_API2, {
      username, password
    },   {headers , observe: 'response'});
  }
}
