import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ThemeComponent} from "./Theme/theme.component";
import {SigninUserComponent} from "./userLogin/signin-user/signin-user.component";
import {SignupUserComponent} from "./userLogin/signup-user/signup-user.component";
import {AuthGuard} from "../share/auth.guard";
import {EditUserComponent} from "./userLogin/edit-user/edit-user.component";
import {ChangePasswordComponent} from "./userLogin/change-password/change-password.component";
import {ResetPassWordComponent} from "./userLogin/reset-pass-word/reset-pass-word.component";

const routes: Routes = [
  {path: '', component: SigninUserComponent},
  {path: 'signup', component: SignupUserComponent},
  {path: 'signin', component: SigninUserComponent},
  {path: 'resetpassword', component: ResetPassWordComponent},

  {path: 'home', canActivate:[AuthGuard] ,component: ThemeComponent ,children: [{
      path: 'profile',
      component: EditUserComponent,

    },
      {path: 'changePassword', component: ChangePasswordComponent}
    ] },{
    path:'**' , component: SigninUserComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
