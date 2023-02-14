import {Component, DoCheck, OnInit} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {NetUser} from 'src/models';
import {MainService} from 'src/services/main.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, DoCheck {
  users1: NetUser[] = [];
  users: NetUser[] = [];
  usr: NetUser[] = []
  total: number = 0;
  page: number = 1;
  pageSize: number = 5;

  constructor(public service: MainService) {
  }

  ngOnInit(): void {
    this.service.getUsers("all").subscribe({
      next: (data) => {
        console.log(data);
        this.users1 = data;
        this.total = this.users1.length;
        this.users = this.users1.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
      },
      error: (err) => {
        console.log('error');
        console.log(err);
        this.users1 = this.usr;
        this.total = this.users1.length;
        this.users = this.users1.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
      },
    });
  }

  ngDoCheck(): void {
    this.users = this.users1.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
