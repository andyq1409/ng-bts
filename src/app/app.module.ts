import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SideNavItemComponent } from './side-nav-item/side-nav-item.component';
import { UserService } from 'src/services/user.service';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { PasswdChgComponent } from './passwd-chg/passwd-chg.component';
import { TokenStorageService } from 'src/services/token-storage.service';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { authInterceptorProviders } from "./interceptors/auth.interceptors";
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { ModalInfoComponent } from "./modal-info/modal-info.component";
import { RolesComponent } from './roles/roles.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { OrdersComponent } from './orders/orders.component';
import { PricestrPipe } from "../models/price.pipe";
import { OrderComponent } from './order/order.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavItemComponent,
    LoginComponent,
    HomeComponent,
    PasswdChgComponent,
    UserComponent,
    UsersComponent,
    DateTimePickerComponent,
    ModalInfoComponent,
    RolesComponent,
    ProductsComponent,
    ProductComponent,
    OrdersComponent,
    PricestrPipe,
    OrderComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    NgbModule, HttpClientModule, AppRoutingModule,
    FormsModule, ReactiveFormsModule,NgbPaginationModule, NgbTypeaheadModule
  ],
  providers: [ UserService, AuthService,TokenStorageService,authInterceptorProviders ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }}
