import { Component, OnInit } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n, I18n } from 'src/language/pl';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}] 
})
export class UserComponent implements OnInit {
	model!: NgbDateStruct;

  constructor(private _i18n: I18n) { 
    this._i18n.language = "pl";
   }

  ngOnInit(): void {
  }

}
