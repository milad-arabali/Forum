import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SigninUserComponent} from "./components/user-authentication/sign-in-user/signin-user.component";
import {SignupUserComponent} from "./components/user-authentication/sign-up-user/signup-user.component";
import {AuthGuard} from "./core/guard/auth.guard";
import {EditUserComponent} from "./components/user-panel/edit-user/edit-user.component";
import {ChangePasswordComponent} from "./components/user-panel/change-password/change-password.component";
import {ResetPassWordComponent} from "./components/user-authentication/reset-pass-word/reset-pass-word.component";
import {HomeComponent} from "./components/home/home.component";



const routes: Routes = [
  {path: '', redirectTo:'/home' , pathMatch:"full" },
  {path: 'signup', component: SignupUserComponent},
  {path: 'signin', component: SigninUserComponent},
  {path: 'resetpassword', component: ResetPassWordComponent},
  {path: 'home', canActivate: [AuthGuard], component: HomeComponent},
  {path: 'profile', component: EditUserComponent, canActivate: [AuthGuard]},
  {path: 'changePassword', component: ChangePasswordComponent, canActivate: [AuthGuard]},
  {path: 'subject-category',
  loadChildren:()=>import('./components/subject-category/subject-category.module')
    .then(m=>m.SubjectCategoryModule)},
  {path: 'subject',
    loadChildren:()=>import('./components/subject-manager/subject-manager.module')
      .then(m=>m.SubjectManagerModule)},
  {path: '**', component: SigninUserComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
