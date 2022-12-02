import { SideNavItems, SideNavSection } from '../models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'ROBOCZE',
        items: ['dashboard', 'pages'],
    },
    {
        text: 'SŁOWNIKI',
        items: ['layouts'],
    },
    {
        text: 'ADMINISTRACJA',
        items: ['charts', 'tables'],
    },
];

export const sideNavItems: SideNavItems = {
    dashboard: {
        icon: 'tachometer-alt',
        text: 'Dashboard',
        link: '/dashboard',
        roles: ["ROLE_ADMIN"]
    },
    layouts: {
        icon: 'columns',
        text: 'Layouts',
        submenu: [
            {
                text: 'Static Navigation',
                link: '/dashboard/static',
                roles: ["ROLE_ADMIN"]
            },
            {
                text: 'Light Sidenav',
                link: '/dashboard/light',
                roles: ["ROLE_AWRT"]
            },
        ],
        roles: ["XXX"]
    },
    pages: {
        icon: 'book-open',
        text: 'Pages',
        submenu: [
            {
                text: 'Authentication',
                submenu: [
                    {
                        text: 'Login',
                        link: '/auth/login',
                        roles: ["ROLE_ADMIN"]
                    },
                    {
                        text: 'Register',
                        link: '/auth/register',
                        roles: ["ROLE_WRT"]
                    },
                    {
                        text: 'Forgot Password',
                        link: '/auth/forgot-password',
                        roles: ["ROLE_ADMIN"]
                    },
                ],
                roles: ["XXX"]
            },
            {
                text: 'Error',
                submenu: [
                    {
                        text: '401 Page',
                        link: '/error/401',
                        roles: ["ROLE_ADMIN"]
                    },
                    {
                        text: '404 Page',
                        link: '/error/404',
                        roles: ["ROLE_VIEW"]
                    },
                    {
                        text: '500 Page',
                        link: '/error/500',
                        roles: ["ROLE_ADMIN"]
                    },
                ],
                roles: ["XXX"]
            },
        ],
        roles: ["XXX"]
    },
    charts: {
        icon: 'chart-area',
        text: 'Charts',
        link: '/charts',
        roles: ["ROLE_ADMIN"]
    },
    tables: {
        icon: 'table',
        text: 'Tables',
        link: '/tables',
        roles: ["ROLE_WRT"]
    },
};
