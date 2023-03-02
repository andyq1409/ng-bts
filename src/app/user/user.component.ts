import { Component, DoCheck, OnInit, ViewChild,
         ViewEncapsulation, AfterViewInit, TemplateRef } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct, NgbModal  } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n, I18n } from 'src/language/pl';
import { ActivatedRoute, Router } from '@angular/router';
import { msgBox, NetUser} from '../../models';
import { MainService } from '../../services/main.service';

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
export class UserComponent implements OnInit, DoCheck, AfterViewInit  {
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

  @ViewChild('content',{read: TemplateRef })
  modMsgX!: TemplateRef<any> ;



  ngAfterViewInit() {
    console.log("usrcomp ngAfterViewInit modMsg", this.modMsgX);
  }

  ngDoCheck(): void {
    // console.log("user.component.doCheck user:", this.user.data_hasla);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (data) => {
        // console.log("UserComponent id user (str):", data.get('id'));
        if (data.get('id') == '0') {
          //let date = new Date();
          this.user = Object.assign(this.user, this.user1);
          this.tittle = 'Nowy użytkownik';
          console.log('usrcomp ngOnInit user0:', this.user);
        } else {
          let idx = Number(data.get('id'));
          // console.log("UserComponent id user (int):", idx);
          this.service.getUsers('all').subscribe({
            next: (data) => {
              console.log('usrcomp ngOnInit data:', data);
              data.forEach((element) => {
                element.id == idx ? (this.user = element) : null;
              });
              this.user.password = '';
              this.user1 = Object.assign(this.user1, this.user);
              console.log('usrcomp ngOnInit user:', this.user); //<<<======== obiekt user =================================
            },
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
      this.service.saveUser(this.user).subscribe({
        next: (data) => {
          console.log('usrcomp onSubmit data:', data);
          this.msg = data;
          console.log("usrcomp onSubmit modMsg", this.modMsgX);
          this.msgType = "S";
          msgBox(this.modalService, data, "S", false).result.then(
             (result) => {
               this.router.navigate(['tabUser']);
             }
           );
        },
        error: (err) => {
          console.log('usrcomp onSubmit error:', err);
          (err.status === 0 ) ? this.msg = "Connection refused" : this.msg = "Error code: " + err.status.toString() ;
          this.msgType = "E";

          msgBox(this.modalService, this.msg, "E", false).result.then(
            (result) => {
              null;
            }
          );
        }
      });
    } else {
      this.msg = "Brak zmian do zapisania.";
      this.msgType = "S";
      this.modalService.open(this.modMsgX, {centered: true}).result.then(
        (result) => {
          this.router.navigate(['tabUser']);
        },
        (reason) => {
          null;
        },
      );

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
          this.errMsg = 'Data od nie może być późniejsza niż data do. ';
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
