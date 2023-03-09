import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MainService} from "../../services/main.service";
import {debounceTime, Subject} from "rxjs";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-passwd-chg',
  templateUrl: './passwd-chg.component.html',
  styleUrls: ['./passwd-chg.component.css']
})
export class PasswdChgComponent implements OnInit {

  oldPasswd: string = '';
  newPasswd: string = '';
  repPasswd: string = '';
  userName: string = '';
  tittle: string = "Zmiana hasła" ;
  validMsg: string = "";
  bodyElement = document.body;

  msg: string = "";
  private _success = new Subject<string>();
  alertType = "success";

  constructor( private route: ActivatedRoute,
               private mainService: MainService  ) {  }

  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;

  ngOnInit(): void {

    this._success.subscribe((message) => (this.msg = message));
    this._success.pipe(debounceTime(10000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });

    this.route.queryParams.subscribe({
      next: (data) => {
        console.log('PasswdChgComponent ngOnInit data:', data);
        this.tittle = data['tittle'];
      }
    });
    if (this.tittle.includes("Wymagana")) {
      const vuser = window.sessionStorage.getItem("auth-user");
      if ( vuser) {
        const obj = JSON.parse(vuser);
        this.userName = obj.username;
      }
    }
  }

  onSubmit(): void {
    console.log('on Submit call');
    (this.bodyElement) ? this.bodyElement.classList.add("loading") : null;
    this.mainService.chgPasswd(this.userName, this.oldPasswd, this.newPasswd).subscribe({
      next: (data) => {
        (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;
        console.log("PasswdChgComponent onSubmit data:",data);
        if ( data === 'Zapisano' ) {
          this.alertType = "success";
          this.msg = data;
        }
        if ( data === 'User not found' ) {
          this.alertType = "danger";
          this.msg = "Nie ma takiego użytkownika";
        }
        if ( data === 'Bad old password' ) {
          this.alertType = "danger";
          this.msg = "Niepoprawne dotychczasowe hasło";
        }
        this._success.next(this.msg);
      },
      error: (err) => {
        (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;
        console.log('error');
        console.log("PasswdChgComponent onSubmit error:",err);
        this.alertType = "danger";
        this.msg = err.message();
        this._success.next(this.msg);
      },
    });
  }

  validateForm() {
    console.log('PasswdChgComponent validateForm');
    this.validMsg = "";
    if (this.newPasswd && this.repPasswd && this.newPasswd !== this.repPasswd) {
      this.validMsg = "Niezgodne nowe hasła";
    }
    if (this.newPasswd && this.oldPasswd && this.newPasswd === this.oldPasswd) {
      this.validMsg = "Nowe hasło musi być inne niż dotychczasowe";
    }

  }

  clearMsg() {
    this.msg = "";
  }

}
