import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {TokenStorageService} from "../../services/token-storage.service";
import {catchError, throwError} from "rxjs";
import {Router, RouterState, RouterStateSnapshot} from "@angular/router";


const TOKEN_HEADER_KEY = 'Authorization';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    console.log(req.url);
    const token = this.tokenStorageService.getToken();
    console.log(token);
    if (token != null && req.url != 'http://localhost:8080/api/auth/signin') {
      console.log('dodanie nagłówka');
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token ) });
    }
    else
      console.log('nie dodajemy nagłówka');
    // @ts-ignore
    return next.handle(authReq).pipe(
      catchError((error) => {
        console.log('error in intercept: ', error.message);
        if (error.error.message.includes("Full authentication is required to access")) {
          this.tokenStorageService.clearUser();
          const routerstate: RouterState = this.router.routerState;
          const state: RouterStateSnapshot = routerstate.snapshot;
          console.log('returnUrl in intercept: ', state.url);
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url, tittle: "Konieczne ponowne zalogowanie" }});
        }
        return throwError(error);
      })
    );
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
