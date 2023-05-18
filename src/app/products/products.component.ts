import {Component, OnInit, ViewChild} from '@angular/core';
import {ProdService} from "../../services/prod.service";
import {mapErrMsg, Number2NumberPL, Product, ProductExt} from "../../models";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {I18n} from "../../language/pl";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {debounceTime, Subject} from "rxjs";
import {Router, RouterState, RouterStateSnapshot} from "@angular/router";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [
    I18n,
  ]
})
export class ProductsComponent implements OnInit {
  bodyElement = document.body;
  productsExtAll: ProductExt[] = [];
  productsExt: ProductExt[] = [];
  total: number = 0;
  page: number = 1;
  pageSize: number = 4;
  xfiltr: string = "???";
  msg: string = "";
  private _success = new Subject<string>();
  alertType = "success";

  constructor(public service: ProdService, private sanitizer: DomSanitizer,
              public sesService: TokenStorageService) {
  }

  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;

  ngOnInit(): void {
    this._success.subscribe((message: string) => (this.msg = message));
    this._success.pipe(debounceTime(10000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
    this.xfiltr = this.sesService.getKey("product-key");
    ( this.xfiltr != "???" && this.xfiltr != "") ? this.start() : this.xfiltr = "???" ;
  }

  start(): void {
    (this.bodyElement) ? this.bodyElement.classList.add("loading") : null;
    this.service.getProducts(0, this.xfiltr).subscribe({
      next: (data: Product[]) => {
        (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;
        //console.log( "data1" , data);
        this.productsExtAll = data as ProductExt[] ;
        this.total = this.productsExtAll.length;
        let objectURL;
        for (let index in this.productsExtAll) {
          objectURL = 'data:image/jpeg;base64,' + this.productsExtAll[index].product_image;
          this.productsExtAll[index].price_str = Number2NumberPL( this.productsExtAll[index].list_price );
          this.productsExtAll[index].url = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          //console.log( "data2", this.productsExtAll);
        }
        console.log( "ngOnInit" , this.productsExtAll )
      },
      error: (err) => {
        (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;
        console.log('error');
        console.log(err.error.message);
        this._success.next(mapErrMsg(err.error.message));
      },
    });
    this.productsExt = this.productsExtAll.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

  doFilter() {
    console.log("ProductsComponent filtr:", this.xfiltr);
    this.start();
  }

  ngDoCheck(): void {
    this.productsExt = this.productsExtAll.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
    this.sesService.saveKey("product-key", this.xfiltr);

  }

  clearMsg() {
    this.msg = "";
  }

}
