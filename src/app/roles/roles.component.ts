import {AfterViewInit, Component, DoCheck, Input,
        OnInit, TemplateRef, ViewChild} from '@angular/core';
import {msgBox, NetRole, NetUser} from 'src/models';
import {MainService} from 'src/services/main.service';
import {ActivatedRoute, Router} from "@angular/router";
import {CustomDatepickerI18n, I18n} from "../../language/pl";
import {NgbDatepickerI18n, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  providers: [
    I18n,
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }
]})

export class RolesComponent implements OnInit, DoCheck, AfterViewInit {
  usrRolesAll: NetRole[] = [];
  usrRoles: NetRole[] = [];
  usrRole: NetRole  = {"id":"0","id_user":"0","id_role":"0","code_role":"????","descr":"????",
                       "date_to":"1900-01-01 12:35:00+0100","date_from":"1901-01-01 07:23:33+0100"};
  usrPrevRole: NetRole  = {"id":"0","id_user":"0","id_role":"0","code_role":"????","descr":"????",
    "date_to":"1900-01-01 12:35:00+0100","date_from":"1901-01-01 07:23:33+0100"};
  total: number = 0;
  page: number = 1;
  pageSize: number = 5;

  idUsr: string = "1";
  username: string = "";
  user: NetUser | undefined ;
  msg: string = '';
  msgType: string = "I"  // I-info  E-error S-success

  constructor(public service: MainService,
              private route: ActivatedRoute,
              private _router: Router,
              private _i18n: I18n,
              private modalService: NgbModal) {
    this._i18n.language = 'pl';
  }

  @ViewChild('content',{read: TemplateRef })
  modMsgX!: TemplateRef<any> ;

  ngAfterViewInit() {
    console.log("usrcomp ngAfterViewInit modMsg", this.modMsgX);
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe({
      next: (data) => {
          console.log("rolescomp id user:", data.get('id'));
          this.idUsr = <string>data.get('id');
        }
    });
    this.service.getUser(this.idUsr).subscribe({
      next: (data) => {
        console.log("rolescompngOnInit data:",data);
        this.user = data;
        this.username = data.imie + " " + data.nazwisko + " (" + data.username +")"
      },
      error: (err) => {
        console.log('error');
        console.log(err);
      },
    });
    this.service.getRoles(this.idUsr).subscribe({
      next: (data) => {
        console.log("rolescomp ngOnInit data:",data);
        this.usrRolesAll = data;
        this.total = this.usrRolesAll.length;
        this.usrRoles = this.usrRolesAll.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
        console.log("rolescomp ngOnInit usrRoles:",this.usrRoles);
      },
      error: (err) => {
        console.log('error');
        console.log(err);
        // (err.status === 0 ) ? this.msg = "Connection refused" : this.msg = "Error code: " + err.status.toString() ;
      },
    });
  }

  ngDoCheck(): void {
    this.usrRoles = this.usrRolesAll.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    console.log("rolescomp ngDoCheck usrRoles:",this.usrRoles);
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

  canceling () {
    console.log("rolescomp canceling idUsr:", this.usrRole.id_user);
    if (this.usrRole.id_user === "0") {
      this._router.navigateByUrl("/tabUser");
    } else {
      this.usrRole = {"id":"0","id_user":"0","id_role":"0","code_role":"????","descr":"????",
        "date_to":"1900-01-01 12:35:00+0100","date_from":"1901-01-01 07:23:33+0100"};
    }
  }

  newRole() {
    let dx = new Date();
    dx.setHours(1,0,0);
    // @ts-ignore
    this.usrRole = {"id":"0","id_user": this.user.id,"id_role":"2","code_role":"????","descr":"????",
      "data_to":"","data_from": dx.toISOString().substring(0, 19).replace('T', ' ') };
    this.usrPrevRole = Object.assign(this.usrPrevRole, this.usrRole);

  }

  onSubmit() {
    console.log('rolescomp onSubmit prev role' , JSON.stringify(this.usrPrevRole));
    console.log('rolescomp onSubmit curr role' , JSON.stringify(this.usrRole));
    if (JSON.stringify(this.usrRole) !== JSON.stringify(this.usrPrevRole)) {
      this.service.saveRole(this.usrRole).subscribe({
        next: (data) => {
          console.log('rolescomp onSubmit data:', data);
          this.msg = data;
          this.msgType = "S";
          msgBox(this.modalService, data, "S", false).result.then(
            (result) => {
              this.usrRole = {"id":"0","id_user":"0","id_role":"0","code_role":"????","descr":"????",
                "date_to":"1900-01-01 12:35:00+0100","date_from":"1901-01-01 07:23:33+0100"};
            }
          );
        },
        error: (err) => {
          console.log('rolescomp onSubmit error:', err);
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
          this.usrRole = {"id":"0","id_user":"0","id_role":"0","code_role":"????","descr":"????",
            "date_to":"1900-01-01 12:35:00+0100","date_from":"1901-01-01 07:23:33+0100"};
        }
      );
    }
  }
}

