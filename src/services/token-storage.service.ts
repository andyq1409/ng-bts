import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from 'src/models';
import { UserService } from './user.service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_NAME = 'auth-username';
const USER_MAIL = 'auth-mail';

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

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
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
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }
}
