import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {ThemeModule} from "./core/layout/theme/theme.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {UserLoginModule} from "./components/user-panel/user-login.module";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CookieService} from "ngx-cookie-service";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {
  MaterialPersianDateAdapter,
  PERSIAN_DATE_FORMATS
} from "./core/adapter/material-persian-date.adapter";
import {TranslateModule,TranslateLoader} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  UserAuthenticationModule
} from "./components/user-authentication/user-authentication.module";
import {
  RoutingSubjectCategoryModule
} from "./components/subject-category/routing-subject-category.module";
import {AppRoutingModule} from "./app-routing.module";
import {NationalCodeValidatorDirective} from "./shared/directive/natonal-code-validator.directive";
import {SubjectCategoryModule} from "./components/subject-category/subject-category.module";
import {SubjectManagerModule} from "./components/subject-manger/subject-manager.module";




export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}




@NgModule({
  declarations: [
    AppComponent,
    NationalCodeValidatorDirective,


  ],
  imports: [
    BrowserModule,
    RoutingSubjectCategoryModule,
    ThemeModule,
    UserAuthenticationModule,
    UserLoginModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    AppRoutingModule,
    HttpClientModule,
    SubjectCategoryModule,
    SubjectManagerModule,
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }
    ),

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
