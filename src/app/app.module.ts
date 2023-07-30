import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ThemeModule} from "./Theme/Theme.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {UserLoginModule} from "./userLogin/user-login.module";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CookieService} from "ngx-cookie-service";
import { TimePipe } from './pipe/time.pipe';



@NgModule({
  declarations: [
    AppComponent,
    TimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ThemeModule,
    BrowserAnimationsModule,
    UserLoginModule,

  ],
  providers: [MatSnackBar,
      CookieService
  ],
  bootstrap: [AppComponent],


})
export class AppModule { }
