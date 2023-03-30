import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Date2AppDate, mapErrMsg, Number2NumberPL, Product, ProductExt} from "../../models";
import {debounceTime, Observable, ReplaySubject, Subject} from "rxjs";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {NumberPL2Number} from "../../models";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import {ProdService} from "../../services/prod.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  tittle: string = "Nowy produkt";
  faCoffee = faCoffee;
  prod: ProductExt = {
    product_id: 0, product_name: "???", product_description: "???", category: "???", product_avail: "Y",
    list_price: 0, product_image: "???", mimetype: "image/jpeg", filename: "???",
    image_last_update: Date2AppDate(new Date()), price_str: "0,00", url: ""
  }
  prod1: ProductExt = {
    product_id: 0, product_name: "???", product_description: "???", category: "???", product_avail: "Y",
    list_price: 0, product_image: "???", mimetype: "image/jpeg", filename: "???",
    image_last_update: Date2AppDate(new Date()), price_str: "0,00", url: ""
  }
  private _success = new Subject<string>();
  alertType = "success";
  bodyElement = document.body;
  msg: string = '';
  selectedFile?: Blob;
  fileOk: boolean = true;
  frmValidOk: boolean = true;
  msgType: string = "I"  // I-info  E-error S-success

  constructor( public service: ProdService,
               private route: ActivatedRoute,
               private sanitizer: DomSanitizer) {}

  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;

  ngOnInit(): void {
    this._success.subscribe((message) => (this.msg = message));
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });

    this.route.paramMap.subscribe({
      next: (data) => {
        this.prod = Object.assign(this.prod, this.prod1);
        if (data.get('id') != '0') {
          this.tittle = 'Edycja produktu';
          // @ts-ignore
          this.prod.product_id = data.get('id');
          this.getProduct();
        }
      },
    })
  }

  getProduct() {
    (this.bodyElement) ? this.bodyElement.classList.add("loading") : null;
    this.service.getProducts( this.prod.product_id, "").subscribe({
      next: (data: Product[]) => {
        (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;
        this.prod = Object.assign(this.prod, data[0]);
        let objectURL = 'data:image/jpeg;base64,' + this.prod.product_image;
        this.prod.price_str = Number2NumberPL( this.prod.list_price );
        this.prod.url = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        console.log( "ngOnInit" , this.prod )
      },
      error: (err) => {
        (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;
        console.log('error');
        console.log(err);
        this.alertType = "danger";
        this.msg  = err.error.message;
        this._success.next(mapErrMsg( this.msg ));
      },
    });
  }

  changeBlok(event: any) {
    (this.prod.product_avail == "Y") ? this.prod.product_avail = 'N' : this.prod.product_avail = 'Y' ;
  }

  onFileSelected($event: any) {
    this.prod.filename = $event.target.files[0].name;
    if (this.validateFile($event.target.files[0])) {
      this.convertFile($event.target.files[0]).subscribe((base64: string) => {
        this.prod.url = base64;
        this.prod.product_image = base64.substring(base64.indexOf("base64")+7);
        this.prod.image_last_update = Date2AppDate(new Date());
        console.log("convertFile", this.prod);
      })
    }
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend =  () => {
      let base64data = reader.result as string;
      result.next( base64data );
    }
    return result;
  }

  onSubmit() {
    console.log('ProductComponent onSubmit prod:', this.prod);
    if (JSON.stringify(this.prod) !== JSON.stringify(this.prod1)) {
      (this.bodyElement) ? this.bodyElement.classList.add("loading") : null;
      this.service.saveProduct(this.prod as Product).subscribe({
        next: (data) => {
          (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;
          console.log('ProductComponent onSubmit data:', data);
          this.prod1 = Object.assign(this.prod1, this.prod) ;
          this.msg = data;
          this.msgType = "S";
          this.alertType = "success";
          this._success.next(this.msg);
        },
        error: (err) => {
          (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;
          console.log('ProductComponent onSubmit error:', err);
          (err.status === 0 ) ? this.msg = "Connection refused" : this.msg = "Error code: " + err.status.toString() ;
          this.msgType = "E";
          this.alertType = "danger";
          this._success.next(mapErrMsg(this.msg));
        }
      });
    } else {
      this.msg = "Brak zmian do zapisania.";
      this.alertType = "warning";
      this._success.next(this.msg);
    }
  }

  clearMsg() {
    this.msg = "";
  }

  validateFile(file: File): boolean  {
    console.log("validateFile file: ", file)
    if (  (  file.type === "image/jpg" || file.type === "image/jpeg"  ) && (file.size <= 12480 ) ) {
      this.fileOk = true;
      this.frmValidOk = true;
      return true;
    } else {
      this.fileOk = false;
      this.frmValidOk = false;
      return false;
    }
  }

  onFocusOutPrice($event: any){
    console.log($event.target.value);
    this.prod.list_price = NumberPL2Number($event.target.value);
    this.prod.price_str = Number2NumberPL(this.prod.list_price);
    console.log("onFocusOutPrice", this.prod);
  }

}
