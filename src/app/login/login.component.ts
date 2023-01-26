import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { TokenStorageService } from 'src/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  username: String = '';
  password: String = '';
  loginError: string = '';

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
      this.router.navigate(['/aqua']);
    }
    //this.operation = this.route.snapshot.data['oper'];
    console.log(this.route.snapshot);
  }

  onSubmit() {
    console.log('on Submit call');
    this.authService.login(this.username, this.password).subscribe({
      next: (data) => {
        console.log(data);
        if (data.status == 200) {
          console.log('Authorization' + data.headers.get('X-Authorization'));
          this.tokenStorage.saveToken(data.headers.get('X-Authorization') as string);
          this.tokenStorage.saveUser(data);
      /*    this.tokenStorage.saveUserName(
            data.body?.firstName + ' ' + data.body?.lastName
          );  */
      //    this.roles = data.body.roles;
          this.router.navigate(['']);
        }
        if (data.status == 400) {
          this.router.navigate(['passwdChg']);
        }
      },
      error: (err) => {
        console.log('error');
        console.log(err);
        if (
          err.status == 401 &&
          err.error.message.includes('account expired')
        ) {
          console.log('account expired');
          this.router.navigate(['passwdChg']);
        }
        if (
          err.status == 401 &&
          err.error.message.includes('Nie ma')
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
