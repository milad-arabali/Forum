import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../../core/guard/auth.guard";
import {UsersManageComponent} from "./users-manage.component";
import {DetailUsersManageComponent} from "./detail-users-manage/detail-users-manage.component";
import {ResetPasswordUsersComponent} from "./reset-password-users/reset-password-users.component";


const routingUsers: Routes = [
  {path: 'users-mange', canActivate: [AuthGuard], component: UsersManageComponent},
  {path: 'users-mange/add', component: DetailUsersManageComponent, canActivate: [AuthGuard]},
  {path: 'users-mange/edit/:id', component: DetailUsersManageComponent, canActivate: [AuthGuard]},
  {path: 'users-mange/:id', component: DetailUsersManageComponent, canActivate: [AuthGuard]},
  {path: 'users-mange/reset-password/:id', component: ResetPasswordUsersComponent, canActivate: [AuthGuard]},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routingUsers)
  ]
})
export class RoutingUsersManageModule {
}
