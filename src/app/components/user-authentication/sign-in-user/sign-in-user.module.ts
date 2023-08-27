import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SigninUserComponent} from "./signin-user.component";
import {TranslateModule} from "@ngx-translate/core";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    SigninUserComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ]
})
export class SignInUserModule { }
