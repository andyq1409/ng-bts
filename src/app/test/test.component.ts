import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProdService} from "../../services/prod.service";
import {Customer} from "../../models/customer.model";
import {debounceTime, Subject} from "rxjs";
import { mapErrMsg } from "../../models";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

	closeResult = '';
  bodyElement = document.body;
  param: string = "";
  customers: Customer[] = [];
  customer_id: number = 0;
  private _success = new Subject<string>();
  alertType = "success";
  msg: string = "";

	constructor(public service: ProdService,
              private modalService: NgbModal) {}

	open(content: any) {
    this.param = "";
    this.customers = [];
    this.customer_id = 0;
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',
                                      centered: true }  ).result.then(
			(result) => {
				this.closeResult = "Wybrany klient id: " + this.customer_id;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  ngOnInit(): void {
    this._success.subscribe((message) => (this.msg = message));
    this._success.pipe(debounceTime(5000)).subscribe(() => {
        this.msg = "";
    });
  }

  search() {
    if (this.param != "" )  {
      (this.bodyElement) ? this.bodyElement.classList.add("loading") : null;
      this.service.getCustomers(0, this.param) .subscribe({
        next: (data: Customer[]) => {
          (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;
          //console.log( "data1" , data);
          this.customers = data;
          this.customer_id = this.customers[0].customer_id;
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

}
