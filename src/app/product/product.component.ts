import {Component, OnInit, ViewChild} from '@angular/core';
import {Date2AppDate, ProductExt} from "../../models";
import {debounceTime, Observable, ReplaySubject, Subject} from "rxjs";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {NumberPL2Number} from "../../models";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  tittle: string = "Nowy produkt";
  faCoffee = faCoffee;
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
    price_str: "0,00",
    url: ""
  }
  private _success = new Subject<string>();
  alertType = "success";
  bodyElement = document.body;
  msg: string = '';
  selectedFile?: Blob;
  fileOk: boolean = true;
  frmValidOk: boolean = true;


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
    this.prod.filename = $event.target.files[0].name;
    if (this.validateFile($event.target.files[0])) {
      this.convertFile($event.target.files[0]).subscribe((base64: string) => {
        this.prod.url = base64;
        this.prod.product_image = base64.substring(base64.indexOf("base64")+7);
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
  }

}
