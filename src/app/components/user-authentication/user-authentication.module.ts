import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignInUserModule} from "./sign-in-user/sign-in-user.module";
import {SignUpUserModule} from "./sign-up-user/sign-up-user.module";



@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule,
    SignInUserModule,
    SignUpUserModule
  ]
})
export class UserAuthenticationModule { }
