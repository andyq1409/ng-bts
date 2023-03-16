import {Component, OnInit} from '@angular/core';
import {ProdService} from "../../services/prod.service";
import {Product} from "../../models";
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
  productsAll: Product[] = [];
  products: Product[] = [];
  urlsAll: SafeUrl[] = [];
  urls: SafeUrl[] = [];
  total: number = 0;
  page: number = 1;
  pageSize: number = 5;

  constructor(public service: ProdService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    (this.bodyElement) ? this.bodyElement.classList.add("loading") : null;
    this.service.getProducts(0, "").subscribe({
      next: (data: Product[]) => {
        (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;
        console.log(data);
        this.productsAll = data;
        this.total = this.productsAll.length;

        let objectURL;
        let image;
        for (let entry of data) {
          objectURL = 'data:image/jpeg;base64,' + entry.product_image;
          image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          this.urlsAll.push(image);
        }

        this.products = this.productsAll.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
        this.urls = this.urlsAll.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      },
      error: (err) => {
        (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;
        console.log('error');
        console.log(err);
      },
    });
  }

  ngDoCheck(): void {
    this.products = this.productsAll.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
    this.urls = this.urlsAll.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

}
