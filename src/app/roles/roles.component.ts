import {Component, DoCheck,
        OnInit, ViewChild} from '@angular/core';
import {NetRole, NetUser} from 'src/models';
import {MainService} from 'src/services/main.service';
import {ActivatedRoute, Router} from "@angular/router";
import {CustomDatepickerI18n, I18n} from "../../language/pl";
import {NgbAlert, NgbDatepickerI18n, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  providers: [
    I18n,
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }
]})

export class RolesComponent implements OnInit, DoCheck {
  usrRolesAll: NetRole[] = [];
  usrRoles: NetRole[] = [];
  usrRole: NetRole  = {"id":"0","id_user":"0","id_role":"0","code_role":"????","descr":"????",
                       "date_from":"1901-01-01 07:23:33+0100","date_to":"1900-01-01 12:35:00+0100"};
  usrPrevRole: NetRole  = {"id":"0","id_user":"0","id_role":"0","code_role":"????","descr":"????",
  "date_from":"1901-01-01 07:23:33+0100","date_to":"1900-01-01 12:35:00+0100"};
  total: number = 0;
  page: number = 1;
  pageSize: number = 5;
  bodyElement = document.body;

  idUsr: string = "1";
  username: string = "";
  user: NetUser | undefined ;
  msg: string = "";

	private _success = new Subject<string>();
  alertType = "success";

  constructor(public service: MainService,
              private route: ActivatedRoute,
              private _router: Router,
              private _i18n: I18n) {
    this._i18n.language = 'pl';
  }

	@ViewChild('selfClosingAlert', { static: false }) 
  selfClosingAlert!: NgbAlert;

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
          console.log("rolescomp id user:", data.get('id'));
          this.idUsr = <string>data.get('id');
          this.service.getUser(this.idUsr).subscribe({
            next: (data) => {
              console.log("rolescomp ngOnInit data:",data);
              this.user = data;
              this.username = data.imie + " " + data.nazwisko + " (" + data.username +")"
              this.service.getRoles(this.idUsr).subscribe({
                next: (data) => {
                  (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;   
                  console.log("rolescomp ngOnInit data:",data);
                  this.usrRolesAll = data;
                  this.total = this.usrRolesAll.length;
                  this.usrRoles = this.usrRolesAll.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
                  console.log("rolescomp ngOnInit usrRoles:",this.usrRoles);
                },
                error: (err) => {
                  (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;  
                  console.log('error');
                  console.log(err);
                },
              });
            },
            error: (err) => {
              (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;  
              console.log('error');
              console.log(err);
            },
          });     
        }
    });
  }

  ngDoCheck(): void {
    this.usrRoles = this.usrRolesAll.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    console.log("rolescomp ngDoCheck usrRoles:",this.usrRoles);
    console.log("rolescomp ngDoCheck usrRole:",this.usrRole);
  }

  getDateFrom($event: string) {
     console.log("rolescomp getDateFrom $event", $event);
    this.usrRole.date_from = $event;
  }

  getDateTo($event: string) {
    console.log("rolescomp getDateTo $event", $event);
    this.usrRole.date_to = $event;
  }

  clickedRow(i: number) {
    console.log("rolescomp click index:", i);
    this.usrRole = this.usrRolesAll[i];
    this.usrPrevRole = Object.assign(this.usrPrevRole, this.usrRole);
  }

  clearMsg() {
    this.msg = "";
  }

  canceling () {
    console.log("rolescomp canceling idUsr:", this.usrRole.id_user);
    if (this.usrRole.id_user === "0") {
      this._router.navigateByUrl("/tabUser");
    } else {
      this.usrRole = {"id":"0","id_user":"0","id_role":"0","code_role":"????","descr":"????",
      "date_from":"1901-01-01 07:23:33+0100","date_to":"1900-01-01 12:35:00+0100"};
    }
  }

  newRole() {
    console.log('rolescomp newRole');
    let dx = new Date();
    dx.setHours(1,0,0);
    // @ts-ignore
    this.usrRole = {"id":"999999999","id_user": this.user.id,"id_role":"","code_role":"????","descr":"????",
      "date_to":null,"date_from": dx.toISOString().substring(0, 19).replace('T', ' ') };
    this.usrPrevRole = Object.assign(this.usrPrevRole, this.usrRole);
    console.log('rolescomp newRole usrRole:', this.usrRole);

  }

  onSubmit() {
    console.log('rolescomp onSubmit prev role' , JSON.stringify(this.usrPrevRole));
    console.log('rolescomp onSubmit curr role' , JSON.stringify(this.usrRole));
    if (JSON.stringify(this.usrRole) !== JSON.stringify(this.usrPrevRole)) {
      (this.bodyElement) ? this.bodyElement.classList.add("loading") : null;      
      this.service.saveRole(this.usrRole).subscribe({
        next: (data) => {
          console.log('rolescomp onSubmit data:', data);
          this.msg = data;
          this.service.getRoles(this.idUsr).subscribe({
            next: (data) => {
              (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;      
              console.log("rolescomp ngOnInit data:",data);
              this.usrRolesAll = data;
              this.total = this.usrRolesAll.length;
              this.usrRoles = this.usrRolesAll.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
              console.log("rolescomp ngOnInit usrRoles:",this.usrRoles);
              this.usrRole = {"id":"0","id_user":"0","id_role":"0","code_role":"????","descr":"????",
                              "date_from":"1901-01-01 07:23:33+0100","date_to":"1900-01-01 12:35:00+0100"};
              this.alertType = "success";          
              this._success.next(this.msg);
            },
            error: (err) => {
              (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;      
              console.log('error');
              console.log(err);
              // (err.status === 0 ) ? this.msg = "Connection refused" : this.msg = "Error code: " + err.status.toString() ;
            },
          });
        },
        error: (err) => {
          (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;      
          console.log('rolescomp onSubmit error:', err);
          (err.status === 0 ) ? this.msg = "Connection refused" : this.msg = "Error code: " + err.status.toString() ;
          // this.msgType = "E";
          // msgBox(this.modalService, this.msg, "E", false).result.then(
          //   (result) => {
          //     null;
          //   }
          // );
        }
      });
    } else {
      this.msg = "Brak zmian do zapisania.";
      this.alertType = "warning";          
      this._success.next(this.msg);
      this.usrRole = {"id":"0","id_user":"0","id_role":"0","code_role":"????","descr":"????",
      "date_from":"1901-01-01 07:23:33+0100","date_to":"1900-01-01 12:35:00+0100"};
    }
  }
}

