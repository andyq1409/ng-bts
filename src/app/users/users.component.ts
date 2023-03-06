import { Component, DoCheck, OnInit } from '@angular/core';
import { timeout } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { NetUser } from 'src/models';
import { MainService } from 'src/services/main.service';

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

  constructor(public service: MainService) {}

  ngOnInit(): void {
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
        // (err.status === 0 ) ? this.msg = "Connection refused" : this.msg = "Error code: " + err.status.toString() ;
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
}
