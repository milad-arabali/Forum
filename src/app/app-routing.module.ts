import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ThemeComponent} from "./Theme/theme.component";
import {SigninUserComponent} from "./userLogin/signin-user/signin-user.component";
import {SignupUserComponent} from "./userLogin/signup-user/signup-user.component";
import {AuthGuard} from "../share/auth.guard";

const routes: Routes = [
  {path: '', component: SigninUserComponent},
  {path: 'signup', component: SignupUserComponent},
  {path: 'signin', component: SigninUserComponent},
  {path: 'home', canActivate:[AuthGuard] ,component: ThemeComponent},
  {
    path:'**' , component: SigninUserComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
