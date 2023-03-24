import {Component, OnInit} from '@angular/core';
import {ProdService} from "../../services/prod.service";
import {Number2NumberPL, Product, ProductExt} from "../../models";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {I18n} from "../../language/pl";

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

  constructor(public service: ProdService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    (this.bodyElement) ? this.bodyElement.classList.add("loading") : null;
    this.service.getProducts(0, "").subscribe({
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
        console.log(err);
      },
    });
    this.productsExt = this.productsExtAll.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

  ngDoCheck(): void {
    this.productsExt = this.productsExtAll.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

}
