import { NgModule } from '@angular/core';
import {ChangePasswordModule} from "./change-password/change-password.module";
import {EditUserModule} from "./edit-user/edit-user.module";
import {ResetPassWordModule} from "../user-authentication/reset-pass-word/reset-pass-word.module";
import {LogOutModule} from "./log-out/log-out.module";







@NgModule({
    declarations: [




    ],
    exports: [

    ],
    imports: [
      ChangePasswordModule,
      EditUserModule,
      ResetPassWordModule,
      LogOutModule


    ]
})
export class UserLoginModule { }
