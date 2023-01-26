import { Injectable } from '@angular/core';
import {
  HttpClient,

} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

const AUTH_API = 'http://localhost:8080/api/auth/signin';

const headers = { 'content-type': 'application/json' };

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(username: String, password: String): Observable<any> {
    return this.http.post(
      AUTH_API,
      {
        username,
        password,
      },
      { headers, observe: 'response' }
    );
  }
}
