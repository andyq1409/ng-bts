import { Component, OnInit } from '@angular/core';
import { Order, OrderItem } from "../../models/orders.model";
import { Subject } from "rxjs";
import { ProdService } from "../../services/prod.service";
import { mapErrMsg } from "../../models";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {
  itemsAll: OrderItem[] = [];
  items: OrderItem[] = [];
  orders: Order[] = [];
  total: number = 0;
  page: number = 1;
  pageSize: number = 5;
  bodyElement = document.body;
  private _success = new Subject<string>();
  msg: string = "";
  alertType = "success";
  order_id: number = 0;

  constructor(public service: ProdService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (data) => {
        if (data.get('id') != '0' ) {
          // @ts-ignore
          this.order_id = data.get('id');
          this.getItems( this.order_id );
        }
      },
    })
  }

  getItems(id: number) {
    (this.bodyElement) ? this.bodyElement.classList.add("loading") : null;
    this.service.getOrderItems(id) .subscribe({
      next: (data: OrderItem[]) => {
        (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;
        //console.log( "data1" , data);
        this.itemsAll = data;
        this.total = this.itemsAll.length;
        console.log( "ngOnInit itemsAll " , this.itemsAll)
        this.items = this.itemsAll.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
        if (this.total > 8) {
          this.alertType = "warning";
          this._success.next ("Znalezionych danych może być więcej. Zawęź filtr.");
        }
        console.log( "ngOnInit items " , this.items)
      },
      error: (err) => {
        (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;
        console.log('error');
        console.log(err.error.message);
        this.alertType = "danger";
        this._success.next(mapErrMsg(err.error.message));
      },
    });


    this.service.getOrders(id, '', '') .subscribe({
      next: (data: Order[]) => {
        (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;
        //console.log( "data1" , data);
        this.orders = data;
        console.log( "ngOnInit order " , this.orders[0]);
      },
      error: (err) => {
        (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;
        console.log('error');
        console.log(err.error.message);
        this.alertType = "danger";
        this._success.next(mapErrMsg(err.error.message));
      },
    });

  }

}
