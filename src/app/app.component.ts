import { Component } from '@angular/core';
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng-bts';
  sideNavItems = sideNavItems;
  sideNavSections = sideNavSections;
  sideNavVisible = true;
  sideNavClass = 'xx';
  expanded = false;
  isActive!: true;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    public tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  toggleSideNav() {
    this.sideNavVisible = !this.sideNavVisible;
  }

  logout(): void {
    console.log('call logout()');
    this.tokenStorage.signOut();
    console.log('after logout()');
    this.router.navigate(['']);
  }
}
