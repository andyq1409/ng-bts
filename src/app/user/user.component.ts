import { Component, DoCheck, OnInit, ViewChild,
         ViewEncapsulation } from '@angular/core';
import { NgbAlert, NgbDatepickerI18n, NgbDateStruct, NgbModal  } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n, I18n } from 'src/language/pl';
import { ActivatedRoute, Router } from '@angular/router';
import { NetUser} from '../../models';
import { MainService } from '../../services/main.service';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [
    I18n,
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
  ],
	encapsulation: ViewEncapsulation.None
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
  errMsg: string = '';
  tittle: string = 'Edycja danych użytkownika';
  msg: string = '';
  msgType: string = "I"  // I-info  E-error S-success
  bodyElement = document.body;

	private _success = new Subject<string>();
  alertType = "success";

  constructor(
    // ==========================================================
    private _i18n: I18n,
    private route: ActivatedRoute,
    private router: Router,
    public service: MainService,
    private modalService: NgbModal
  ) {
    this._i18n.language = 'pl';
  }

	@ViewChild('selfClosingAlert', { static: false }) 
  selfClosingAlert!: NgbAlert;

  clearMsg() {
    this.msg = "";
  }
  
  ngDoCheck(): void {
    // console.log("user.component.doCheck user:", this.user.data_hasla);
  }

  ngOnInit(): void {
		this._success.subscribe((message) => (this.msg = message));
		this._success.pipe(debounceTime(10000)).subscribe(() => {
			if (this.selfClosingAlert) {
				this.selfClosingAlert.close();
			}
		});

    (this.bodyElement) ? this.bodyElement.classList.add("loading") : null;   
    this.route.paramMap.subscribe({
      next: (data) => {
        (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;   
        // console.log("UserComponent id user (str):", data.get('id'));
        if (data.get('id') == '0') {
          //let date = new Date();
          this.user = Object.assign(this.user, this.user1);
          this.tittle = 'Nowy użytkownik';
          console.log('usrcomp ngOnInit user0:', this.user);
        } else {      
          let idx = Number(data.get('id'));
          // console.log("UserComponent id user (int):", idx);
          (this.bodyElement) ? this.bodyElement.classList.add("loading") : null;   
          this.service.getUsers('all').subscribe({
            next: (data) => {
              (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;   
              console.log('usrcomp ngOnInit data:', data);
              data.forEach((element) => {
                element.id == idx ? (this.user = element) : null;
              });
              this.user.password = '';
              this.user1 = Object.assign(this.user1, this.user);
              console.log('usrcomp ngOnInit user:', this.user); //<<<======== obiekt user =================================
            },
            error: (err) => {
              (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;  
              console.log('usrcomp onSubmit error:', err);
            }
          });
        }
      },
    });
  }

  getDateDo($event: string) {
    // console.log("usrcomp getDateDo $event", $event);
    $event === '' ? (this.user.data_do = null) : (this.user.data_do = $event);
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
    console.log('usrcomp getDateHasla user', this.user);
    console.log('usrcomp getDateHasla prev user:', this.user1);
  }

  onSubmit() {
    console.log('usrcomp onSubmit user:', this.user);
    console.log('usrcomp onSubmit prev user:', this.user1);
    if (JSON.stringify(this.user) !== JSON.stringify(this.user1)) {
      (this.bodyElement) ? this.bodyElement.classList.add("loading") : null;   
      this.service.saveUser(this.user).subscribe({
        next: (data) => {
          (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;   
          console.log('usrcomp onSubmit data:', data);
          this.user1 = Object.assign(this.user1, this.user) ;    
          this.msg = data;
          this.msgType = "S";
          this.alertType = "success";          
          this._success.next(this.msg);
        },
        error: (err) => {
          (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;   
          console.log('usrcomp onSubmit error:', err);
          (err.status === 0 ) ? this.msg = "Connection refused" : this.msg = "Error code: " + err.status.toString() ;
          this.msgType = "E";
          this.alertType = "success";          
          this._success.next(this.msg);
        }
      });
    } else {
      this.msg = "Brak zmian do zapisania.";
      this.alertType = "warning";  
      this._success.next(this.msg);  
    }
  }

  changeBlok(event: any) {
    event.target.checked ? (this.user.locked = 1) : (this.user.locked = 0);
  }

  validateUser() {
    // console.log("usrcomp validateUser usrOK", this.usrOK);
    setTimeout(() => {
      this.usrOK = true;
      this.errMsg = '';
      if (this.user.data_do !== null) {
        if (this.user.data_od > this.user.data_do) {
          this.usrOK = false;
          this.msg = 'Data od nie może być późniejsza niż data do. ';
          this.alertType = "danger";       
          this._success.next(this.msg);  
        }
      }
      // console.log("usrcomp validateUser errMsg", this.errMsg);
      // console.log("usrcomp validateUser usrOK", this.usrOK);
    }, 100);
  }

  // openVerticallyCentered(content: any) {
  //   console.log("usrcomp openVerticallyCentered content", content);
	// 	this.modalService.open(content, { centered: true });
	// }



}
