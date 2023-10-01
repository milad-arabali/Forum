import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../../core/guard/auth.guard";
import {UsersManageComponent} from "./users-manage.component";
import {DetailUsersManageComponent} from "./detail-users-manage/detail-users-manage.component";
import {ResetPasswordUsersComponent} from "./reset-password-users/reset-password-users.component";
import {IsAdminGuard} from "../../core/guard/is-admin.guard";


const routingUsers: Routes = [
  {path: 'users-manage', canActivate: [AuthGuard,IsAdminGuard], component: UsersManageComponent},
  {path: 'users-manage/add', component: DetailUsersManageComponent, canActivate: [AuthGuard,IsAdminGuard]},
  {path: 'users-manage/edit/:id', component: DetailUsersManageComponent, canActivate: [AuthGuard,IsAdminGuard]},
  {path: 'users-manage/:id', component: DetailUsersManageComponent, canActivate: [AuthGuard,IsAdminGuard]},
  {path: 'users-manage/reset-password/:id', component: ResetPasswordUsersComponent, canActivate: [AuthGuard,IsAdminGuard]},
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
