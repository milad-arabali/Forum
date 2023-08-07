import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ThemeModule} from "./components/layout/Theme/module/Theme.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {UserLoginModule} from "./components/user-panel/module/user-login.module";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CookieService} from "ngx-cookie-service";
import {MatNativeDateModule} from "@angular/material/core";
import {HttpClientModule} from "@angular/common/http";





@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ThemeModule,
    BrowserAnimationsModule,
    UserLoginModule,
    MatNativeDateModule,
    HttpClientModule,



  ],
  providers: [MatSnackBar,
    CookieService,
  ],
  bootstrap: [AppComponent],



})
export class AppModule { }
