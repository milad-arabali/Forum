import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../../core/guard/auth.guard";
import {SubjectManagerComponent} from "./subject-manager.component";
import {DetailSubjectComponent} from "./detail-subject/detail-subject.component";

const routingSubject: Routes = [
  {path: 'subject', canActivate: [AuthGuard], component: SubjectManagerComponent},
  {path: 'subject/add', component: DetailSubjectComponent, canActivate: [AuthGuard]},
  {path: 'subject/edit/:id', component: DetailSubjectComponent, canActivate: [AuthGuard]},
  {path: 'subject/:id', component: DetailSubjectComponent, canActivate: [AuthGuard]},
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
