import { IconName } from "@fortawesome/fontawesome-common-types";

export interface SBRouteData {
    title?: string;
    activeTopNav?: string;
    breadcrumbs: Breadcrumb[];
}

export interface Breadcrumb {
    text: string;
    link?: string;
    active?: boolean;
}

export interface SideNavItems {
    [index: string]: SideNavItem;
}

export interface SideNavItem {
    icon?: IconName;
    text: string;
    link?: string;
    submenu?: SideNavItem[];
    roles: string[];
}

export interface SideNavSection {
    text?: string;
    items: string[];
}
