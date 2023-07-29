import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninUserComponent } from './signin-user/signin-user.component';
import { SignupUserComponent } from './signup-user/signup-user.component';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

import { LogOutComponent } from './log-out/log-out.component';
import {MatDialogModule} from "@angular/material/dialog";







@NgModule({
  declarations: [
    SigninUserComponent,
    SignupUserComponent,
    LogOutComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterLink,
    ReactiveFormsModule,
    MatDialogModule,


  ]
})
export class UserLoginModule { }
