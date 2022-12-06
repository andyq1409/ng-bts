import { TranslationWidth } from '@angular/common';
import { Injectable } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import {NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

interface localeSet {
  [index: string]: localeLabels;
}

interface localeLabels {
    weekdays: string[];
    months: string[];
    monthsFull: string[];
}

const I18N_VALUES: localeSet  = {
	fr: {
		weekdays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
		months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
    monthsFull: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc']
	},
	pl: {
		weekdays: ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'],
		months: ['Sty', 'Luy', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],
    monthsFull: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']
	},
	// other languages you would support
};

// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
@Injectable()
export class I18n {
	language: string = "fr";
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
	constructor(private _i18n: I18n) {
		super();
	}
  getMonthFullName(month: number, year?: number): string{
    return I18N_VALUES[this._i18n.language].monthsFull[month-1];
  }
	getWeekdayLabel(weekday: number): string {
		return I18N_VALUES[this._i18n.language].weekdays[weekday-1];
	}
	getMonthShortName(month: number): string {
		return I18N_VALUES[this._i18n.language].months[month - 1];
	}
	getDayAriaLabel(date: NgbDateStruct): string {
		return `${date.day}-${date.month}-${date.year}`;
	}
}