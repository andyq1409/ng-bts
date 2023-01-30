import {Component, DoCheck, OnInit} from '@angular/core';
import {NgbCalendar, NgbDate, NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {CustomDatepickerI18n, I18n} from 'src/language/pl';
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";
import {DbUser} from "../../models";
import { NgModel } from '@angular/forms';
import { formatDate } from 'src/models/lib';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]
})
export class UserComponent implements OnInit, DoCheck {
  dtpDateOd!: NgbDateStruct;
  user: Partial<DbUser> = {"id": 0,"locked": 1, "data_od": new Date().toLocaleDateString(), 
    "data_hasla": new Date().toLocaleDateString()};
  emptyUser1: DbUser = {
    "id": 0, "username": "???", "password": "???", "nazwisko": "???", "imie": "???",
    "email": "???", "locked": 0, "data_od": new Date().toLocaleDateString(), "data_do": null,
    "data_hasla": new Date().toLocaleDateString(), "roles": []
  };
  emptyUser2: DbUser = {
    "id": 0, "username": "jankow", "password": "???", "nazwisko": "Kowalski", "imie": "???",
    "email": "???", "locked": 0, "data_od": new Date().toLocaleDateString(), "data_do": null,
    "data_hasla": new Date().toLocaleDateString(), "roles": []
  };
  idx: number | undefined;


  constructor(private _i18n: I18n, private route: ActivatedRoute, private calendar: NgbCalendar) {
    this._i18n.language = "pl";
  }

  ngDoCheck(): void {
    this.user.data_od = formatDate(new Date(this.dtpDateOd.year,this.dtpDateOd.month-1, this.dtpDateOd.day));
  }

  ngOnInit(): void {
    console.log(this.route);
    this.route.paramMap.subscribe({
        next: (data) => {
          if (data.get('id') == '0') {
            
            let date = new Date();
            console.log(date);
            this.dtpDateOd = {year: date.getFullYear(), month: date.getMonth()+1, day: date.getDate()};
          } else {
            this.user = this.emptyUser2;
          }
        },
        error: (err) => {
          console.log('error');
          console.log(err);
        }
      }
    )
  }

  onSubmit() {
    return false;
  }

  changeBlok(event: any) {
    (event.target.checked) ? this.user.locked =  1 : this.user.locked =  0;    }
  
  printModel(title: NgModel) {
    console.log(title);
  }
}
