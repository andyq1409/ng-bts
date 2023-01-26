import {Component, OnInit} from '@angular/core';
import {NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {CustomDatepickerI18n, I18n} from 'src/language/pl';
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";
import {DbUser} from "../../models";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]
})
export class UserComponent implements OnInit {
  model!: NgbDateStruct;
  user: DbUser | undefined;
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


  constructor(private _i18n: I18n, private route: ActivatedRoute) {
    this._i18n.language = "pl";
  }

  ngOnInit(): void {
    console.log(this.route);
    this.route.paramMap.subscribe({
        next: (data) => {
          if (data.get('id') == '0') {
            this.user = this.emptyUser1;
          } else {
            this.user = this.emptyUser2;
          }
          console.log(this.user);
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
}
