import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { TokenStorageService } from 'src/services/token-storage.service';
import {User} from "../../models";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  username: String = 'ewapit';
  password: String = 'szczecin';
  loginError: string = '';
  bodyElement = document.body;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute ) {}

  ngOnInit(): void {
    console.log('page login ngOnInit');
    this.isLoggedIn = this.tokenStorage.isLoggedIn();
    if (this.isLoggedIn) {
      console.log('page login redirect to home');
      this.router.navigate(['']);
    }
    //this.operation = this.route.snapshot.data['oper'];
    console.log(this.route.snapshot);
  }

  onSubmit() {
    console.log('on Submit call');
    if (this.bodyElement) {
      this.bodyElement.classList.add("loading");
    }
    this.authService.login(this.username, this.password).subscribe({
      next: (data) => {
        if (this.bodyElement) {
          this.bodyElement.classList.remove("loading");
        }
        console.log("LoginComponent onSubmit data:",data);

        const user: User = data.body;
        console.log("LoginComponent onSubmit user:",user);
        if (data.status == 200) {
          this.tokenStorage.saveToken(data.headers.get('X-Authorization') as string);
          this.tokenStorage.saveUser(data);
        }

        if (user.roles.includes("PASSW_EXPIRED") ) {
          this.router.navigate(['passwdChg'],{ queryParams: { tittle: 'Wymagana zmiana hasła'}})
        } else
        {
          this.router.navigate([''])
        }
      },
      error: (err) => {
        if (this.bodyElement) {
          this.bodyElement.classList.remove("loading");
        }
        console.log('error');
        console.log(err);
        if (
          err.status == 401
        ) {
          this.loginError = err.error.message;
        }
      },
    });

  }

  printModel(title: NgModel) {
    console.log(title)
  }

}
