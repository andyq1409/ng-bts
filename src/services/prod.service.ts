import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../models';
import { Observable } from 'rxjs';
import { Order } from '../models/orders.model';
import { Customer } from '../models/customer.model';

const MAIN_API = 'http://localhost:8080/api/main/';

@Injectable({
  providedIn: 'root',
})
export class ProdService {
  constructor(private http: HttpClient) {}

  getProducts(id: number, name: string): Observable<Product[]> {
    let parameters: HttpParams = new HttpParams()
      .set('id', id)
      .set('name', name);
    console.log('ProdService getProducts parameters:', parameters);
    // @ts-ignore
    return this.http.get<string>(MAIN_API + 'getProds', {
      params: parameters,
    });
  }

  saveProduct(prod: Product): Observable<string> {
    prod.image_last_update = prod.image_last_update.replace(' ', 'T');
    return this.http.post(MAIN_API + 'saveProduct', prod, {
      observe: 'body',
      responseType: 'text',
    });
  }

  getOrders(
    orderId: number,
    customer: string,
    orderDate: string
  ): Observable<Order[]> {
    let parameters: HttpParams = new HttpParams()
      .set('order_id', orderId)
      .set('customer', customer)
      .set('order_timestamp', orderDate);
    console.log('ProdService getOrders parameters:', parameters);
    // @ts-ignore
    return this.http.get<string>(MAIN_API + 'getOrders', {
      params: parameters,
    });
  }

  getCustomers(
    customer_id: number,
    cust_last_name: string
  ): Observable<Customer[]> {
    let parameters: HttpParams = new HttpParams()
      .set('customerr_id', customer_id)
      .set('cust_last_name', cust_last_name);
    console.log('ProdService getCustomers parameters:', parameters);
    // @ts-ignore
    return this.http.get<string>(MAIN_API + 'getCustomers', {
      params: parameters,
    });
  }




}
