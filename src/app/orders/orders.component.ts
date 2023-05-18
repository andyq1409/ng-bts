import {Component, OnInit, ViewChild} from '@angular/core';
import { Order } from "../../models/orders.model";
import { ProdService } from "../../services/prod.service";
import { mapErrMsg  } from "../../models";
import {debounceTime, Subject} from "rxjs";
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  ordersAll: Order[] = [];
  orders: Order[] = [];
  total: number = 0;
  page: number = 1;
  pageSize: number = 5;
  dateFrom: string = "";
  customer: string = "";
  bodyElement = document.body;
  private _success = new Subject<string>();
  msg: string = "";
  alertType = "success";
  filtr: string = "xxx";

  constructor(public service: ProdService,
              public sesService: TokenStorageService ) { }

  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;

  ngOnInit(): void {
    this._success.subscribe((message: string) => (this.msg = message));
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
    this.customer = this.sesService.getOrdersCustomer();
    this.dateFrom = this.sesService.getOrdersDateFrom();
    if (this.customer != "" || this.dateFrom != "")
    {
      this.doFilter();
      console.log("Init do Filter");
    }  }


  getDateFrom($event: string) {
    this.dateFrom = $event;
  }

  doFilter() {
    if (this.customer == "" && this.dateFrom =="") {
      this.alertType = "warning";
      this._success.next("Podaj warunki filtrowania");
    } else {
      (this.bodyElement) ? this.bodyElement.classList.add("loading") : null;
      this.service.getOrders(0, this.customer, this.dateFrom) .subscribe({
        next: (data: Order[]) => {
          (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;
          //console.log( "data1" , data);
          this.ordersAll = data;
          this.total = this.ordersAll.length;
          console.log( "doFilter" , this.ordersAll )
          console.log( "doFilter total" , this.total )
          if (this.total > 8) {
            this.alertType = "warning";
            this._success.next ("Znalezionych danych może być więcej. Zawęź filtr.");
          }
        },
        error: (err) => {
          (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;
          console.log('error');
          console.log(err.error.message);
          this.alertType = "danger";
          this._success.next(mapErrMsg(err.error.message));
        },
      });
      this.orders = this.ordersAll.slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
    }
  }

  clearMsg() {
    this.msg = "";
  }

  ngDoCheck(): void {
    this.orders = this.ordersAll.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
    console.log("dataFrom", this.dateFrom);
    console.log("customer", this.customer);
    this.sesService.saveOrdersDateFrom(this.dateFrom);
    this.sesService.saveOrdersCustomer(this.customer);
  }

}
