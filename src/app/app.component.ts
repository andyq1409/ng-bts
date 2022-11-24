import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { sideNavItems, sideNavSections } from '../../src/data';
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-bts';
  sideNavItems = sideNavItems;
  sideNavSections = sideNavSections;
  _sideNavVisible$ = new BehaviorSubject(true);
  expanded = false;
  isActive!: true;


  constructor(public userService: UserService) {}

  toggleSideNav(visibility?: boolean) {
      if (typeof visibility !== 'undefined') {
          this._sideNavVisible$.next(visibility);
      } else {
          this._sideNavVisible$.next(!this._sideNavVisible$.value);
      }
  }
}
