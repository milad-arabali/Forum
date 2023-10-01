import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../../core/guard/auth.guard";
import {SubjectManagerComponent} from "./subject-manager.component";
import {DetailSubjectComponent} from "./detail-subject/detail-subject.component";
import {ManageCommentsComponent} from "./manage-comments/manage-comments.component";
import {ManageVoteComponent} from "./manage-vote/manage-vote.component";
import {IsAdminGuard} from "../../core/guard/is-admin.guard";

const routingSubject: Routes = [
  {path: 'subject', canActivate: [AuthGuard,IsAdminGuard], component: SubjectManagerComponent},
  {path: 'subject/add', component: DetailSubjectComponent, canActivate: [AuthGuard,IsAdminGuard]},
  {path: 'subject/edit/:id', component: DetailSubjectComponent, canActivate: [AuthGuard,IsAdminGuard]},
  {path: 'subject/:id', component: DetailSubjectComponent, canActivate: [AuthGuard,IsAdminGuard]},
  {path: 'subject/manage-votes/:id', component: ManageVoteComponent, canActivate: [AuthGuard,IsAdminGuard]},
  {path: 'subject/manage-comments/:id', component: ManageCommentsComponent, canActivate: [AuthGuard,IsAdminGuard]},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routingSubject)
  ]
})
export class RoutingSubjectModule {
}
