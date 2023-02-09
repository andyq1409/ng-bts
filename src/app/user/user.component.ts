import {Component, DoCheck, OnInit} from '@angular/core';
import {NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {CustomDatepickerI18n, I18n} from 'src/language/pl';
import {ActivatedRoute} from "@angular/router";
import {DbUser} from "../../models";
import {NgModel} from '@angular/forms';
import {MainService} from "../../services/main.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]
})
export class UserComponent implements OnInit, DoCheck {
  dtpDateOd!: NgbDateStruct;
  dtpDateDo!: string;
  dtpDatePasswd!: NgbDateStruct;
  user: Partial<DbUser> = {
    "id": 0, "username": "nieznany", "locked": 1, "data_od": new Date(),
    "data_hasla": new Date()
  };
  user1: DbUser = {
    "id": 0, "username": "???", "password": "???", "nazwisko": "???", "imie": "???",
    "email": "???", "locked": 0, "data_od": new Date(), "data_do": null,
    "data_hasla": new Date(), "roles": []
  };
  emptyUser2: DbUser = {
    "id": 0, "username": "jankow", "password": "???", "nazwisko": "Kowalski", "imie": "???",
    "email": "???", "locked": 0, "data_od": new Date(), "data_do": null,
    "data_hasla": new Date(), "roles": []
  };
  idx: number = 0;


  constructor(private _i18n: I18n, private route: ActivatedRoute, public service: MainService) {
    this._i18n.language = "pl";
  }

  ngDoCheck(): void {
    console.log("user.component.doCheck", this.dtpDateDo);
    //this.user.data_od = new Date(this.dtpDateOd.year, this.dtpDateOd.month - 1, this.dtpDateOd.day);
    //this.user.data_hasla = new Date(this.dtpDatePasswd.year, this.dtpDatePasswd.month - 1, this.dtpDatePasswd.day);
    //this.user.data_do = this.dtpDateDo;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (data) => {
        console.log("id user (str):", data.get('id'));
        if (data.get('id') == '0') {
          let date = new Date();
          this.dtpDateOd = {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
        } else {
          let idx = Number(data.get('id'));
          console.log("id user (int):", idx);
          this.service.getUsers("all").subscribe({
            next: (data) => {
              console.log(data);
              data.forEach(element => {
                (element.id == idx ) ? this.user1 = element : null ;
              });
              console.log("user1",this.user1);
              this.dtpDateOd = UserComponent.settingDtps(this.user1.data_od);
              console.log(this.dtpDateOd);
              if (this.user1.data_do !== null) {
                // @ts-ignore
                this.dtpDateDo = new Date(this.user1.data_do).toString();
                console.log(this.dtpDateDo);
              }
              console.log(this.dtpDateDo);
              this.dtpDatePasswd = UserComponent.settingDtps(this.user1.data_hasla);
              console.log(this.dtpDatePasswd);
              this.user = this.user1;
              this.user.password = "";
              console.log("user",this.user); //<<<======== obiekt user =================================
            },
          });
        }
      }


    })
  }

  private static settingDtps(dt: Date): NgbDateStruct {
    let retVal: NgbDateStruct = {year: 1900, month: 1, day: 1};
    //if (dt !== null) {
      console.log("--------------",dt);
      let dt1: Date = new Date(dt);
      console.log(dt1);
      console.log(dt1.getFullYear());
      // @ts-ignore
      retVal.year = dt1.getFullYear();
      // @ts-ignore
      retVal.month = dt1.getMonth()+1;
      // @ts-ignore
      retVal.day = dt1.getDate();
      // @ts-ignore
      return retVal;
    //}
    //return ;
  }

  getDatetime($event: string) {
    this.user.data_do = new Date($event);
;  }

  onSubmit() {
    return false;
  }

  changeBlok(event: any) {
    (event.target.checked) ? this.user.locked = 1 : this.user.locked = 0;
  }

  printModel(title: NgModel) {
    console.log(title);
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
