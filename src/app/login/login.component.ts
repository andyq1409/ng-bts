import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  username: String = '';
  password: String = '';

  constructor() { }

  ngOnInit(): void {
    console.log('page login ngOnInit');
  }

  onSubmit() {
   
  }

  printModel(title: NgModel) {
    console.log(title)
  }

}
