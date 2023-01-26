import {Component, DoCheck, OnInit} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {DbUser} from 'src/models';
import {MainService} from 'src/services/main.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, DoCheck {
  users1: DbUser[] = [];
  users: DbUser[] = [];
  usr: DbUser[] =
    [{"id":4,"username":"jurwit","password":"$2a$10","nazwisko":"Witor","imie":"Jerzy","email":"aaa@dddd.com","locked":0,"data_od":"2022-01-01","data_do":null,"data_hasla":"2023-01-31","roles":[]},
      {"id":1,"username":"jankow","password":"$2a$","nazwisko":"Kowalski","imie":"żółćęślążń","email":"aaa@dddd.com","locked":0,"data_od":"2015-01-01","data_do":null,"data_hasla":"2023-10-31","roles":[]},
      {"id":2,"username":"zennow","password":"$2a$1","nazwisko":"Nowak","imie":"Zenon","email":"aaa@dddd.com","locked":0,"data_od":"2020-01-01","data_do":"2022-09-12","data_hasla":"2022-09-30","roles":[]},
      {"id":3,"username":"zennow","password":"$2a$1","nazwisko":"Nowak","imie":"Zenon","email":"aaa@dddd.com","locked":1,"data_od":"2020-01-01","data_do":"2022-09-12","data_hasla":"2022-09-30","roles":[]},
      {"id":4,"username":"zennow","password":"$2a$1","nazwisko":"Nowak","imie":"Zenon","email":"aaa@dddd.com","locked":0,"data_od":"2020-01-01","data_do":"2022-09-12","data_hasla":"2022-09-30","roles":[]},
      {"id":5,"username":"zennow","password":"$2a$1","nazwisko":"Nowak","imie":"Zenon","email":"aaa@dddd.com","locked":0,"data_od":"2020-01-01","data_do":"2022-09-12","data_hasla":"2022-09-30","roles":[]},
      {"id":6,"username":"zennow","password":"$2a$1","nazwisko":"Nowak","imie":"Zenon","email":"aaa@dddd.com","locked":1,"data_od":"2020-01-01","data_do":"2022-09-12","data_hasla":"2022-09-30","roles":[]},
      {"id":7,"username":"zennow","password":"$2a$1","nazwisko":"Nowak","imie":"Zenon","email":"aaa@dddd.com","locked":0,"data_od":"2020-01-01","data_do":"2022-09-12","data_hasla":"2022-09-30","roles":[]},
      {"id":8,"username":"zennow","password":"$2a$1","nazwisko":"Nowak","imie":"Zenon","email":"aaa@dddd.com","locked":0,"data_od":"2020-01-01","data_do":"2022-09-12","data_hasla":"2022-09-30","roles":[]},
      {"id":9,"username":"zennow","password":"$2a$1","nazwisko":"Nowak","imie":"Zenon","email":"aaa@dddd.com","locked":1,"data_od":"2020-01-01","data_do":"2022-09-12","data_hasla":"2022-09-30","roles":[]},
      {"id":10,"username":"zennow","password":"$2a$1","nazwisko":"Nowak","imie":"Zenon","email":"aaa@dddd.com","locked":0,"data_od":"2020-01-01","data_do":"2022-09-12","data_hasla":"2022-09-30","roles":[]},
      {"id":11,"username":"zennow","password":"$2a$1","nazwisko":"Nowak","imie":"Zenon","email":"aaa@dddd.com","locked":0,"data_od":"2020-01-01","data_do":"2022-09-12","data_hasla":"2022-09-30","roles":[]},
      {"id":12,"username":"ewapit","password":"$2a$10","nazwisko":"Piątkowska","imie":"Ewa","email":"aaa@dddd.com","locked":0,"data_od":"2022-01-01","data_do":null,"data_hasla":"2023-03-31","roles":[]}]
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
