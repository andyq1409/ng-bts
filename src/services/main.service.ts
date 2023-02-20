import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {NetUser} from 'src/models';
import {HttpClient, HttpParams} from "@angular/common/http";

const AUTH_API = 'http://localhost:8080/api/main/';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) {
  }

  getUsers(param: string): Observable<NetUser[]> {
    const options =
      param ? {params: new HttpParams().set('filtrStr', param)} : {};
    return this.http.get<NetUser[]>(AUTH_API + "usrlist", options);
  }

  saveUser(usr: NetUser): Observable<string> {
    usr.data_od = usr.data_od.replace(" ","T");
    (usr.data_do !== null) ? usr.data_do = usr.data_do.replace(" ","T") : null;
    usr.data_hasla = usr.data_hasla.replace(" ","T");
    return this.http.post(AUTH_API + "saveUser", usr, { observe: "body", responseType: 'text' } );
  }
}
