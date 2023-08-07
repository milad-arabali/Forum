import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninUserComponent } from '../../user-authentication/sign-in-user/signin-user.component';
import { SignupUserComponent } from '../../user-authentication/sign-up-user/signup-user.component';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LogOutComponent } from '../log-out/log-out.component';
import {MatDialogModule} from "@angular/material/dialog";
import { EditUserComponent } from '../edit-user/edit-user.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatListModule} from "@angular/material/list";
import { ChangePasswordComponent } from '../change-password/change-password.component';
import {CdkTableModule} from "@angular/cdk/table";
import {MatIconModule} from "@angular/material/icon";
import {MatRadioModule} from "@angular/material/radio";
import { ResetPassWordComponent } from '../../user-authentication/reset-pass-word/reset-pass-word.component';







@NgModule({
  declarations: [
    SigninUserComponent,
    SignupUserComponent,
    LogOutComponent,
    EditUserComponent,
    ChangePasswordComponent,
    ResetPassWordComponent
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
    CdkTableModule,
    MatIconModule,
    MatRadioModule,
    FormsModule,


  ]
})
export class UserLoginModule { }
