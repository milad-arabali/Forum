import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResetPassWordModule} from "../reset-pass-word/reset-pass-word-module/reset-pass-word.module";
import {SignInUserModule} from "../sign-in-user/sign-in-user-module/sign-in-user.module";
import {SignUpUserModule} from "../sign-up-user/sign-up-user-module/sign-up-user.module";



@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule,
    ResetPassWordModule,
    SignInUserModule,
    SignUpUserModule
  ]
})
export class UserAuthenticationModule { }
