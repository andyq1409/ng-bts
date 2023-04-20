import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {debounceTime, Subject, timeout} from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import {mapErrMsg, NetUser} from 'src/models';
import { MainService } from 'src/services/main.service';
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, DoCheck {
  users1: NetUser[] = [];
  users: NetUser[] = [];
  usr: NetUser[] = [];
  total: number = 0;
  page: number = 1;
  pageSize: number = 5;
  bodyElement = document.body;
  msg: string = "";
  private _success = new Subject<string>();
  alertType = "success";

  constructor(public service: MainService) {}

  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;

  ngOnInit(): void {
    this._success.subscribe((message: string) => (this.msg = message));
    this._success.pipe(debounceTime(10000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
    // if (this.bodyElement) {
    //   this.bodyElement.classList.add("loading");
    // }
    (this.bodyElement) ? this.bodyElement.classList.add("loading") : null;
    this.service.getUsers('all').subscribe({
      next: (data) => {
        // if (this.bodyElement) {
        //   this.bodyElement.classList.remove("loading");
        // }
        (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;
        console.log(data);
        this.users1 = data;
        this.total = this.users1.length;
        this.users = this.users1.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      },
      error: (err) => {
        // if (this.bodyElement) {
        //   this.bodyElement.classList.remove("loading");
        // }
        (this.bodyElement) ? this.bodyElement.classList.remove("loading") : null;
        console.log('error');
        console.log(err);
        this.alertType = "danger";
        this._success.next(mapErrMsg(err.error.message));
                   this.users1 = this.usr;
        this.total = this.users1.length;
        this.users = this.users1.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      },
    });
  }

  ngDoCheck(): void {
    this.users = this.users1.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

  clearMsg() {
    this.msg = "";
  }

}
