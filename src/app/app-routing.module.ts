import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ThemeComponent} from "./Theme/theme.component";
import {SigninUserComponent} from "./userLogin/signin-user/signin-user.component";

const routes: Routes = [
  {path:'',component: SigninUserComponent},
  {path:'users', component:ThemeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
