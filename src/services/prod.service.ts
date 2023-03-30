import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import {NetUser, Product} from "../models";
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

  saveProduct(prod: Product): Observable<string> {
    prod.image_last_update = prod.image_last_update.replace(" ","T");
    return this.http.post(MAIN_API + "saveProduct", prod, { observe: "body", responseType: 'text' } );
  }

}
