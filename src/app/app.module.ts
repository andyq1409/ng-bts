import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SideNavItemComponent } from './side-nav-item/side-nav-item.component';
import { UserService } from 'src/services/user.service';
import { IconsModule } from 'src/icons/icons.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SideNavItemComponent,
    LoginComponent,    
  ],
  imports: [
    BrowserModule,
    NgbModule,
    IconsModule,FormsModule, ReactiveFormsModule
  ],
  providers: [ UserService ],
  bootstrap: [AppComponent],
  exports: [IconsModule]
})
export class AppModule { }
