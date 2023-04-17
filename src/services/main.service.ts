import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {NetUser, NetRole} from 'src/models';
import {HttpClient, HttpParams} from "@angular/common/http";

const AUTH_API = 'http://localhost:8080/api/main/';
const USER_API = "http://localhost:8080/api/user/"

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) {
  }

  getUsers(param: string): Observable<NetUser[]> {
    const options =
      param ? {params: new HttpParams().set('filtrStr', param)} : {};
    console.log("MainService getUsers options:",options);
    return this.http.get<NetUser[]>(AUTH_API + "usrlist", options);
  }

  saveUser(usr: NetUser): Observable<string> {
    usr.data_od = usr.data_od.replace(" ","T");
    (usr.data_do !== null) ? usr.data_do = usr.data_do.replace(" ","T") : null;
    usr.data_hasla = usr.data_hasla.replace(" ","T");
    return this.http.post(AUTH_API + "saveUser", usr, { observe: "body", responseType: 'text' } );
  }

  chgPasswd(username: string, oldpasswd: string, newpasswd: string): Observable<string> {
    let parameters: HttpParams = new HttpParams()
      .set("username", username)
      .set("oldpasswd", oldpasswd)
      .set("newpasswd", newpasswd);
    console.log("MainService chgPasswd parameters:", parameters );
    // @ts-ignore
    return this.http.get<string>(USER_API + "usrChgPasswd", { observe: "body", params: parameters, responseType: 'text' });
  }

  getRoles(param: string): Observable<NetRole[]> {
    const options =
      param ? {params: new HttpParams().set('idUser', param)} : {};
    return this.http.get<NetRole[]>(AUTH_API + "usrRolList", options);
  }

  getUser(param: string): Observable<NetUser> {
    const options =
      param ? {params: new HttpParams().set('idUser', param)} : {};
    return this.http.get<NetUser>(AUTH_API + "user", options);
  }

  saveRole(role: NetRole): Observable<string> {
    role.date_from = role.date_from.replace(" ","T");
    (role.date_to !== null) ? role.date_to = role.date_to.replace(" ","T") : null;
    return this.http.post(AUTH_API + "updUserRole", role, { observe: "body", responseType: 'text' } );
  }


}
