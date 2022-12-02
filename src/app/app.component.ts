import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { sideNavItems, sideNavSections } from '../../src/data';
import { UserService } from '../services/user.service';
import {
  faAngleDown,
  faAngleRight,
  faArrowLeft,
  faBars,
  faBookOpen,
  faChartArea,
  faChartBar,
  faChartPie,
  faChevronDown,
  faChevronUp,
  faColumns,
  faSearch,
  faTable,
  faTachometerAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/services/auth.service';
import { TokenStorageService } from 'src/services/token-storage.service';
import { Router } from '@angular/router';
import { SideNavItem, SideNavItems, SideNavSection } from 'src/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ng-bts';
  sideNavItems = sideNavItems;
  sideNavSections = sideNavSections;
  sideNavVisible = true;
  sideNavClass = 'xx';
  expanded = false;
  isActive!: true;

  sideNavSectionsRob: SideNavSection[] = [];
  sideNavItemsRob: SideNavItems = {};
//====================================================================================
  constructor(
    public userService: UserService,
    public authService: AuthService,
    public tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.makeMenu();
  }

  toggleSideNav() {
    this.sideNavVisible = !this.sideNavVisible;
    console.log(this.tokenStorage.user.roles);
    var xx = this.isAccess(this.tokenStorage.user.roles, [
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

  isUser(): boolean {
    if ((this.tokenStorage.user.username = 'nn')) {
      console.log('nie ma usera');
      return false;
    }
    console.log('nie ma usera');
    return true;
  }

  /*
  function isBigEnough(element, index, array) { 
    return (element >= 10); 
 } 
           
 var passed = [12, 5, 8, 130, 44].filter(isBigEnough); 
 console.log("Test Value : " + passed );

*/

  isAccess(roles: string[], mreq: string[]): boolean {
    for (let x of mreq) {
      console.log('-' + x);
      for (let y of roles) {
        console.log('    -' + y);
        if (x == y) {
          console.log('Zgodność');
          return true;
        }
      }
    }
    return false;
  }

  makeMenu(): void {
    let i = 0;
    for (let nsection of this.sideNavSections) {
      for (let item of nsection.items) {
        var nitems = this.sideNavItems[item];
        if ( nitems.submenu ) {
          let xx = this.getSubmenu(nitems.submenu);
        } else {

        }

      }

    }
  }

  getSubmenu(submenu: SideNavItem[]): SideNavItem[] {
    let out = [ {text: "xxx", roles: ["xxx"]} ];
    for (let item of submenu) {
      if ( item.submenu ) {
        let xx = this.getSubmenu( item.submenu );
        if ( xx.length > 0 ) {
          for (let ss of xx) {
            out.push(ss);
          }
        }
      } else {
        if ( this.isAccess(this.tokenStorage.user.roles, item.roles) ) {
          out.push(item);
        }
    }
    return out;
  }
}
