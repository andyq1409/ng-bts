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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-bts';
  sideNavItems = sideNavItems;
  sideNavSections = sideNavSections;
  sideNavVisible = true;
  sideNavClass = "xx";
  expanded = false;
  isActive!: true;


  constructor(public userService: UserService) {}

  toggleSideNav() {
      this.sideNavVisible = !this.sideNavVisible;
  }
}
