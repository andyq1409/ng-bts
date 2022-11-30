import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-passwd-chg',
  templateUrl: './passwd-chg.component.html',
  styleUrls: ['./passwd-chg.component.css']
})
export class PasswdChgComponent implements OnInit {

  oldPasswd: String = '';
  newPasswd: String = '';
  repPasswd: String = '';
  userName: String = '';

  constructor(
  ) {}

  ngOnInit(): void {
    console.log('page change login ngOnInit');
  }
  
  onSubmit(): void {
    console.log('on Submit call');
  }

}
