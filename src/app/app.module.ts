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

@NgModule({
  declarations: [
    AppComponent,
    SideNavItemComponent,
    LoginComponent,
    HomeComponent,
    PasswdChgComponent,    
  ],
  imports: [
    BrowserModule,
    NgbModule, HttpClientModule, AppRoutingModule,
    IconsModule,FormsModule, ReactiveFormsModule
  ],
  providers: [ UserService, AuthService,TokenStorageService ],
  bootstrap: [AppComponent],
  exports: [IconsModule]
})
export class AppModule { }
