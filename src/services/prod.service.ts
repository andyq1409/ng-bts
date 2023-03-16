import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Product } from "../models";
import { Observable } from "rxjs";

const MAIN_API = 'http://localhost:8080/api/main/';

@Injectable({
  providedIn: 'root'
})
export class ProdService {

  constructor(private http: HttpClient) {
  }

  getProducts(id: number, name: string): Observable<Product[]> {
    let parameters: HttpParams = new HttpParams()
      .set("id", id)
      .set("name", name);
    console.log("ProdService getProducts parameters:", parameters);
    // @ts-ignore
    return this.http.get<string>(MAIN_API + "getProds", {
      params: parameters
    });
  }

}
