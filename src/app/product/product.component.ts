import {Component, OnInit, ViewChild} from '@angular/core';
import {Date2AppDate, ProductExt} from "../../models";
import {debounceTime, Observable, ReplaySubject, Subject} from "rxjs";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  tittle: string = "Nowy produkt";
  prod: ProductExt = {
    product_id: 0,
    product_name: "???",
    product_description: "???",
    category: "???",
    product_avail: "Y",
    list_price: 0,
    product_image: "???",
    mimetype: "image/jpeg",
    filename: "???",
    image_last_update: Date2AppDate(new Date()),
    price_str: "0.00",
    url: ""
  }
  private _success = new Subject<string>();
  alertType = "success";
  bodyElement = document.body;
  msg: string = '';


  constructor() { }

  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;

  ngOnInit(): void {
    this._success.subscribe((message) => (this.msg = message));
    this._success.pipe(debounceTime(10000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  changeBlok(event: any) {
    (this.prod.product_avail == "Y") ? this.prod.product_avail = 'N' : this.prod.product_avail = 'Y' ;
  }

  onFileSelected($event: any) {
    this.convertFile($event.target.files[0]).subscribe((base64: string) => {
      this.prod.product_image = base64;
    });

  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => {
        // @ts-ignore
      let data: string = event.target.result.toString();
      let buff = new Buffer(data);
      let base64data = buff.toString('base64');
      result.next( base64data );
    }
    return result;
  }

  onSubmit() {
  }

  clearMsg() {
    this.msg = "";
  }


}
