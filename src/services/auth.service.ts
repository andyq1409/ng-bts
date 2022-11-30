import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/models';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth';
const AUTH_API2 = 'http://localhost:8080/api/auth/signin';

const headers = { 'content-type': 'application/json' };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User = {
    id: '2',
    username: 'andy',
    firstName: 'Janusz',
    lastName: 'Kowalski',
    email: 'andy@warski.pl',
  };
  xheaders = new HttpHeaders()
    .set('X-Authorization', 'sdfhgsthzfbfhaszfdbzsafdhazdfadbbg')
    .set('Access-Control-Allow-Origin', '*');

  xheadersErr = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*');

  response: HttpResponse<User> = {
    body: this.user,
    headers: this.xheaders,
    status: 200,
    statusText: '',
    url: null,
    type: HttpEventType.Response,
    clone: function (): HttpResponse<User> {
      throw new Error('Function not implemented.');
    },
    ok: true,
  };

  principal: any = {
    username: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;

  constructor(private http: HttpClient) {}

  login2(username: String, password: String): Observable<any> {
    return this.http.post(
      AUTH_API2,
      {
        username,
        password,
      },
      { headers, observe: 'response' }
    );
  }

  login3(username: String, password: String): Observable<HttpResponse<User>> {
    if (username == this.user.username && password == "warszawa") {
      return new BehaviorSubject<HttpResponse<User>>(this.response);
    }
    else {
      return new BehaviorSubject<HttpResponse<User>>(this.responseErr);}
  }

  responseErr: HttpResponse<User> = {
    body: null,
    headers: this.xheadersErr,
    status: 400,
    statusText: '',
    url: null,
    type: HttpEventType.Response,
    clone: function (): HttpResponse<User> {
      throw new Error('Function not implemented.');
    },
    ok: false,
  };
}
