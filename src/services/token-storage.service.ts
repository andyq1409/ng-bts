import { Injectable } from '@angular/core';
import { User } from 'src/models';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_NAME = 'auth-username';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  userNn: User = {
    id: '0',
    username: 'nn',
    firstName: 'nn',
    lastName: 'nn',
    email: 'nn',
    roles: []
  };

  user: User = this.userNn;
  //========================================================================================
  constructor() { }

  signOut(): void {
    console.log('window.sessionStorage.clear()');
    window.sessionStorage.clear();
    this.user = this.userNn;
  }

  public saveKey(key: string, value: string): void {
    window.sessionStorage.removeItem(key);
    window.sessionStorage.setItem(key, value);
  }

  public getKey(key: string): string {
    const x2 = window.sessionStorage.getItem(key);
    if (x2) {
      return x2;
    }
    return "";
  }


  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveOrdersDateFrom(data: string) {
    window.sessionStorage.removeItem("orders-date-from");
    window.sessionStorage.setItem("orders-date-from", data);
  }

  public getOrdersDateFrom(): string {
    const x1 = window.sessionStorage.getItem("orders-date-from");
    if (x1) {
      return x1;
    }
    return "";
  }

  public saveOrdersCustomer(data: string) {
    window.sessionStorage.removeItem("orders-customer");
    window.sessionStorage.setItem("orders-customer", data);
  }

  public getOrdersCustomer(): string {
    const x3 = window.sessionStorage.getItem("orders-customer");
    if (x3) {
      return x3;
    }
    return "";
  }

  public clearUser(): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USER_KEY);
    this.user = this.userNn;
  }

  public saveUser(data: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    this.user = data.body;
    console.log(this.user);
  //  window.sessionStorage.setItem(USER_KEY, JSON.stringify(data.body.username));
  //  window.sessionStorage.removeItem(USER_MAIL);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(data.body));
  }

  public saveUserName(username: any): void {
    window.sessionStorage.removeItem(USER_NAME);
    window.sessionStorage.setItem(USER_NAME, JSON.stringify(username));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public getUserName(): any {
    const user = window.sessionStorage.getItem(USER_NAME);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public isLoggedIn(): boolean {
    // console.log("vuser:",vuser);
    const usr = window.sessionStorage.getItem(USER_KEY);
    if (usr ) {
      //console.log(user +vuser.username <> " zalogowany");
      return true;
    }
    //console.log("User nie zalogowany");
    return false;
  }
}
