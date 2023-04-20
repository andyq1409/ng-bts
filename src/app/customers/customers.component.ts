import {Component, OnInit, ViewChild} from '@angular/core';
import {Customer} from "../../models/customer.model";
import {debounceTime, Subject} from "rxjs";
import {ProdService} from "../../services/prod.service";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {Order} from "../../models/orders.model";
import {mapErrMsg} from "../../models";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customersAll: Customer[] = [];
  customers: Customer[] = [];
  total: number = 0;
  page: number = 1;
  pageSize: number = 5;
  msg: string = "";
  alertType = "success";
  bodyElement = document.body;
  private _success = new Subject<string>();
  custParam: string = "";

  constructor(public service: ProdService) { }

  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;

  ngOnInit(): void {
    this._success.subscribe((message: string) => (this.msg = message));
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  doFilter() {
    if (this.custParam == "") {
      this.alertType = "warning";
      this._success.next("Podaj warunki filtrowania");
    } else {
      (this.bodyElement) ? this.bodyElement.classList.add("loading") : null;
      this.service.getCustomers(0, this.custParam) .subscribe({
        next: (data: Customer[]) => {
          (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;
          //console.log( "data1" , data);
          this.customersAll = data;
          this.total = this.customersAll.length;
          console.log( "doFilter" , this.customersAll );
          console.log( "doFilter total" , this.total );
          if (this.total > 6) {
            this.alertType = "warning";
            this._success.next ("Znalezionych danych może być więcej. Zawęź filtr.");
          }
          this.customers = this.customersAll.slice(
            (this.page - 1) * this.pageSize,
            (this.page - 1) * this.pageSize + this.pageSize
          );
          console.log( "doFilter" , this.customers );
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

  clearMsg() {
    this.msg = "";
  }

  ngDoCheck(): void {
    this.customers = this.customersAll.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }


}
