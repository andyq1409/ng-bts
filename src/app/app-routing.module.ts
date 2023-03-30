import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PasswdChgComponent } from './passwd-chg/passwd-chg.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import {RolesComponent} from "./roles/roles.component";
import {ProductsComponent} from "./products/products.component";
import {ProductComponent} from "./product/product.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'passwdChg',
    component: PasswdChgComponent,
  },
  {
    path: 'editUser/:id',
    component: UserComponent,
  },
  {
    path: 'tabUser',
    component: UsersComponent,
  },
  {
    path: 'editRoles/:id',
    component: RolesComponent,
  },
  {
    path: 'products/prods',
    component: ProductsComponent,
  },
  {
    path: 'products/editProd/:id',
    component: ProductComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

