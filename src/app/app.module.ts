import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ThemeModule} from "./components/layout/Theme/module/Theme.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {UserLoginModule} from "./components/user-panel/module/user-login.module";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CookieService} from "ngx-cookie-service";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {HttpClientModule} from "@angular/common/http";
import {
  MaterialPersianDateAdapter,
  PERSIAN_DATE_FORMATS
} from "./components/user-panel/adapter/material-persian-date.adapter";
import {NationalCodeValidatorDirective} from "./components/user-panel/directive/natonal-code-validator.directive";






@NgModule({
  declarations: [
    AppComponent,
    NationalCodeValidatorDirective

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
    CookieService,{
      provide: DateAdapter,
      useClass: MaterialPersianDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    {
      provide:MAT_DATE_FORMATS,
      useValue:PERSIAN_DATE_FORMATS
    },
  ],
  bootstrap: [AppComponent],



})
export class AppModule { }
