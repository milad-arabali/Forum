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
import { EditUserComponent } from './edit-user/edit-user.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatListModule} from "@angular/material/list";







@NgModule({
  declarations: [
    SigninUserComponent,
    SignupUserComponent,
    LogOutComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterLink,
    ReactiveFormsModule,
    MatDialogModule,
    MatGridListModule,
    MatDatepickerModule,
    MatListModule,


  ]
})
export class UserLoginModule { }
