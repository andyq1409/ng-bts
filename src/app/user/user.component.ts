import {Component, DoCheck, OnInit} from '@angular/core';
import {NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {CustomDatepickerI18n, I18n} from 'src/language/pl';
import {ActivatedRoute} from "@angular/router";
import {NetUser} from "../../models";
//import {NgModel} from '@angular/forms';
import {MainService} from "../../services/main.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [
    I18n,
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
  ],
}) //===================================================================================================================
//=======================================================================================================================
export class UserComponent implements OnInit, DoCheck {
  dtpDateOd!: NgbDateStruct;
  //usrDateDo!: string;
  dtpDatePasswd!: NgbDateStruct;
  user: NetUser = {
    id: 0,
    username: '???',
    password: '???',
    nazwisko: '???',
    imie: '???',
    email: '???',
    locked: 0,
    data_od: new Date().toISOString().replace('T', ' ').substring(0, 10),
    data_do: null,
    data_hasla: new Date().toISOString().replace('T', ' ').substring(0, 10),
    roles: [],
  };
  user1: NetUser = {
    id: 0,
    username: '???',
    password: '???',
    nazwisko: '???',
    imie: '???',
    email: '???',
    locked: 0,
    data_od: new Date().toISOString().replace('T', ' ').substring(0, 10),
    data_do: null,
    data_hasla: new Date().toISOString().replace('T', ' ').substring(0, 10),
    roles: [],
  };
  usrOK: boolean = true;
  errMsg: string = "";

  constructor(  // ==========================================================
    private _i18n: I18n,
    private route: ActivatedRoute,
    public service: MainService
  ) {
    this._i18n.language = 'pl';
  }

  ngDoCheck(): void {
    // console.log("user.component.doCheck dtpDatePasswd:", this.dtpDatePasswd);
    // this.user.data_hasla =
    //   this.dtpDatePasswd.year.toString().padStart(4, '0') +
    //   '-' +
    //   this.dtpDatePasswd.month.toString().padStart(2, '0') +
    //   '-' +onDateChange
    //   this.dtpDatePasswd.day.toString().padStart(2, '0') +
    //   ' 00:00:00';
    console.log("user.component.doCheck user:", this.user.data_hasla);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (data) => {
        // console.log("UserComponent id user (str):", data.get('id'));
        if (data.get('id') == '0') {
          //let date = new Date();
          this.user = this.user1;
          console.log("UserComponent ngOnInit user0:",this.user);
        } else {
          let idx = Number(data.get('id'));
          // console.log("UserComponent id user (int):", idx);
          this.service.getUsers('all').subscribe({
            next: (data) => {
              console.log("UserComponent ngOnInit data:",data);
              data.forEach((element) => {
                element.id == idx ? (this.user = element) : null;
              });
              //this.dtpDateOd = UserComponent.settingDtps(this.user.data_od);
              // console.log("UserComponent ngOnInit dtpDateOd:",this.dtpDateOd);
              //if (this.user.data_do !== null) {
              //  this.usrDateDo = this.user.data_do!;
              //}
              // console.log("UserComponent ngOnInit usrDateDo:",this.usrDateDo);
              //let dx = new Date(this.user.data_hasla);
              //this.dtpDatePasswd = { year: dx.getFullYear(), month: dx.getMonth()+1, day: dx.getDay()};
              //  this.user.data_hasla
              //);
              // console.log("UserComponent ngOnInit dtpDatePasswd:",this.dtpDatePasswd);
              //this.user = this.user1;
              this.user.password = '';
              console.log("UserComponent ngOnInit user:",this.user); //<<<======== obiekt user =================================
            },
          });
        }
      },
    });
  }

  private static settingDtps(dt: string): NgbDateStruct {
    let retVal: NgbDateStruct = { year: 1700, month: 1, day: 1 };
    //if (dt !== null) {
    // console.log("--------------",dt);
    let dt1: Date = new Date(dt);
    // console.log(dt1);
    // console.log(dt1.getFullYear());
    // @ts-ignore
    retVal.year = dt1.getFullYear();
    // @ts-ignore
    retVal.month = dt1.getMonth() + 1;
    // @ts-ignore
    retVal.day = dt1.getDate();
    // @ts-ignore
    return retVal;
    //}
    //return ;
  }

  getDateDo($event: string) {
    // console.log("usrcomp getDateDo $event", $event);
    ( $event === "") ? this.user.data_do = null : this.user.data_do = $event;
    // console.log("usrcomp getDateDo user.data_do", this.user.data_do);
    // console.log("usrcomp getDateDo user", this.user);
    this.validateUser();
  }

  getDateOd($event: string) {
    // console.log("usrcomp getDateOd $event", $event);
    this.user.data_od = $event;
    // console.log("usrcomp getDateOd user", this.user);
    this.validateUser();
  }

  getDateHasla($event: string) {
    this.user.data_hasla = $event;
    console.log("usrcomp getDateHasla user", this.user);
  }

  onSubmit() {
    return false;
  }

  changeBlok(event: any) {
    event.target.checked ? (this.user.locked = 1) : (this.user.locked = 0);
  }

  validateUser() {
    // console.log("usrcomp validateUser usrOK", this.usrOK);
    setTimeout(  () =>    {
      this.usrOK = true;
      this.errMsg = "";
      if (this.user.data_do !== null) {
        if (this.user.data_od > this.user.data_do) {
          this.usrOK = false;
          this.errMsg = "Data od nie może być późniejsza niż data do. ";
        }
      }
      // console.log("usrcomp validateUser errMsg", this.errMsg);
      // console.log("usrcomp validateUser usrOK", this.usrOK);
      }, 100
    )

  }
}


/*
    // @ts-ignore
    this.dtpDateOd.year = this.user.data_od?.getFullYear();
    // @ts-ignore
    this.dtpDateOd.month = this.user.data_od?.getMonth();
    // @ts-ignore
    this.dtpDateOd.day = this.user.data_od?.getDay();



    */
