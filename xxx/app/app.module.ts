import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SideNavItemComponent } from './side-nav-item/side-nav-item.component';
import { UserService } from 'src/services/user.service';
import { IconsModule } from 'src/icons/icons.module';
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
    RolesComponent
  ],
  imports: [
    BrowserModule,
    NgbModule, HttpClientModule, AppRoutingModule,
    IconsModule,FormsModule, ReactiveFormsModule,NgbPaginationModule, NgbTypeaheadModule
  ],
  providers: [ UserService, AuthService,TokenStorageService,authInterceptorProviders ],
  bootstrap: [AppComponent],
    exports: [IconsModule, DateTimePickerComponent]
})
export class AppModule { }
