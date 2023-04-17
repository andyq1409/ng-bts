import {Component, OnInit, ViewChild} from '@angular/core';
import { Order } from "../../models/orders.model";
import { ProdService } from "../../services/prod.service";
import { mapErrMsg  } from "../../models";
import {debounceTime, Subject} from "rxjs";
import {ModalDismissReasons, NgbAlert, NgbModal} from "@ng-bootstrap/ng-bootstrap";

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
  closeResult: string = "";

  constructor(public service: ProdService,
              private modalService: NgbModal) { }

  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;

  open(content: any) {
    (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${OrdersComponent.getDismissReason(reason)}`;
      },
    );
  }

  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    this._success.subscribe((message: string) => (this.msg = message));
    this._success.pipe(debounceTime(7000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }


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
  }

}
