import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ThemeComponent} from "./components/layout/theme/theme.component";
import {SigninUserComponent} from "./components/user-authentication/sign-in-user/signin-user.component";
import {SignupUserComponent} from "./components/user-authentication/sign-up-user/signup-user.component";
import {AuthGuard} from "../share/services/auth.guard";
import {EditUserComponent} from "./components/user-panel/edit-user/edit-user.component";
import {ChangePasswordComponent} from "./components/user-panel/change-password/change-password.component";
import {ResetPassWordComponent} from "./components/user-authentication/reset-pass-word/reset-pass-word.component";
import {SubjectCategoryComponent} from "./components/sidebar-component/subject-category/subject-category.component";
import {
  EditSubjectCategoryComponent
} from "./components/sidebar-component/subject-category/edit-subject-category/edit-subject-category.component";
import {
  ShowSubjectCategoryComponent
} from "./components/sidebar-component/subject-category/show-subject-category/show-subject-category.component";
import {
  AddSubjectCategoryComponent
} from "./components/sidebar-component/subject-category/add-subject-category/add-subject-category.component";

const routes: Routes = [
  {path: '', component: SigninUserComponent},
  {path: 'signup', component: SignupUserComponent},
  {path: 'signin', component: SigninUserComponent},
  {path: 'resetpassword', component: ResetPassWordComponent},
  {
    path: 'home', canActivate: [AuthGuard], component: ThemeComponent, children: [{
      path: 'profile',
      component: EditUserComponent,

    },
      {path: 'changePassword', component: ChangePasswordComponent},
      {
        path: 'subject-category', component: SubjectCategoryComponent, children: [
          {path: 'edit/:id', component: EditSubjectCategoryComponent},
          {path: 'show/:id', component: ShowSubjectCategoryComponent},
          {path: 'add', component: AddSubjectCategoryComponent}
        ]
      }

    ]
  }, {
    path: '**', component: SigninUserComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
