import {Component, DoCheck, OnInit} from '@angular/core';
import { sideNavItems, sideNavSections } from '../data';
import { UserService } from '../services/user.service';
import { AuthService } from 'src/services/auth.service';
import { TokenStorageService } from 'src/services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, DoCheck  {
  title = 'ng-bts';
  sideNavItems = sideNavItems;
  sideNavSections = sideNavSections;
  sideNavVisible = true;
//  sideNavClass = 'xx';
  expanded = false;
//  isActive!: true;
//  sideNavSectionsRob: SideNavSection[] = [];
//  sideNavItemsRob: SideNavItems = {};
  //====================================================================================
  constructor(
    public userService: UserService,
    public authService: AuthService,
    public tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log("app.component ready");
  }

  ngDoCheck() {
    //console.log("app.component ngDoCheck run");
  }

  toggleSideNav() {
    this.sideNavVisible = !this.sideNavVisible;
    console.log(this.tokenStorage.user.roles);
    this.isAccess(this.tokenStorage.user.roles, [
      'ROLE_VIEW',
      'ROLE_WRT',
    ]);
  }

  logout(): void {
    console.log('call logout()');
    this.tokenStorage.signOut();
    console.log('after logout()');
    this.router.navigate(['']);
  }

  // isUser(): boolean {
  //   if ((this.tokenStorage.user.username = 'nn')) {
  //     console.log('nie ma usera');
  //     return false;
  //   }
  //   console.log('nie ma usera');
  //   return true;
  // }

  isAccess(roles: string[], mreq: string[]): boolean {
    for (let x of mreq) {
      for (let y of roles) {
        if (x == y) {
          return true;
        }
      }
    }
    return false;
  }
}
