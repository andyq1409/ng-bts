import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { TokenStorageService } from 'src/services/token-storage.service';
import { SideNavItem } from '../../models'

@Component({
    selector: 'sb-side-nav-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './side-nav-item.component.html',
    styleUrls: ['side-nav-item.component.css'],
})
export class SideNavItemComponent implements OnInit {
    @Input() sideNavItem!: SideNavItem;
    @Input() isActive!: boolean;

    expanded = false;

    constructor(
        public tokenStorage: TokenStorageService) {}

    ngOnInit() {}

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
