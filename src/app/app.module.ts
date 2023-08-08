import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ThemeModule} from "./components/layout/theme/module/theme.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {UserLoginModule} from "./components/user-panel/module/user-login.module";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CookieService} from "ngx-cookie-service";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";

import {
  MaterialPersianDateAdapter,
  PERSIAN_DATE_FORMATS
} from "./components/user-panel/adapter/material-persian-date.adapter";
import {NationalCodeValidatorDirective} from "./components/user-panel/directive/natonal-code-validator.directive";
import {TranslateModule,TranslateLoader} from "@ngx-translate/core";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


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
    HttpClientModule,
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }
    )



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
