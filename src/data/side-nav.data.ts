import { SideNavItems, SideNavSection } from '../models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'OPERACJE',
        items: ['products', 'orders', 'pages'],
        roles: ["ROLE_ADMIN","ROLE_VIEW","ROLE_WRT"]
    },
    {
        text: 'RAPORTY',
        items: ['layouts'],
        roles: ["ROLE_ADMIN","ROLE_WRT"]
    },
    {
        text: 'ADMINISTRACJA',
        items: ['editUser','tabUser'],
        roles: ["ROLE_ADMIN"]
    },
];

export const sideNavItems: SideNavItems = {
    products: {
        icon: 'tachometer-alt',
        text: 'Produkty',
        submenu: [
          {
            text: 'Nowy produkt',
            link: 'products/editProd/0',
            roles: ["ROLE_ADMIN"]
          },
          {
            text: 'Produkty',
            link: '/products/prods',
            roles: ["ROLE_ADMIN"]
          },
        ],
        roles: ["ROLE_ADMIN"]
    },
  orders: {
    icon: 'tachometer-alt',
    text: 'Zamówienia',
    submenu: [
      {
        text: 'Lista zamówień',
        link: '/orders/orders',
        roles: ["ROLE_ADMIN"]
      },
      {
        text: 'Nowe zamówienie',
        link: 'orders/editOrder/0',
        roles: ["ROLE_ADMIN"]
      },
    ],
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
                roles: ["ROLE_WRT"]
            },
        ],
        roles: ["ROLE_ADMIN","ROLE_WRT"]
    },
    pages: {
        icon: 'book-open',
        text: 'Pages',
        submenu: [
            {
                        text: 'Test',
                        link: '/test/test',
                        roles: ["ROLE_ADMIN"]
            },
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
                roles: ["ROLE_ADMIN","ROLE_WRT"]
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
                roles: ["ROLE_ADMIN","ROLE_VIEW"]
            },
        ],
        roles: ["ROLE_ADMIN","ROLE_VIEW","ROLE_WRT"]
    },
    editUser: {
        icon: 'user',
        text: 'Nowy uzytkownik',
        link: 'editUser/0',
        roles: ["ROLE_ADMIN"]
    },
    tabUser: {
        icon: 'user',
        text: 'Uzytkownicy',
        link: 'tabUser',
        roles: ["ROLE_ADMIN"]
    },
};
