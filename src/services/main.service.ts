import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {DbUser} from 'src/models';
import {HttpClient, HttpParams} from "@angular/common/http";

const AUTH_API = 'http://localhost:8080/api/main/usrlist';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) {
  }

  getUsers(param: string): Observable<DbUser[]> {
    const options =
      param ? {params: new HttpParams().set('filtrStr', param)} : {};
    return this.http.get<DbUser[]>(AUTH_API, options);
  }
}
