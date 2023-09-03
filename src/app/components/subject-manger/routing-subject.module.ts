import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../../core/guard/auth.guard";
import {SubjectManagerComponent} from "./subject-manager.component";
import {
  DetailSubjectCategoryComponent
} from "../subject-category/detail-subject-category/detail-subject-category.component";

const routingSubject: Routes = [

  {path: 'subject', canActivate: [AuthGuard], component: SubjectManagerComponent},
  {path: 'subject/add/:id', component: DetailSubjectCategoryComponent, canActivate: [AuthGuard]},
  {path: 'subject/edit/:id', component: DetailSubjectCategoryComponent, canActivate: [AuthGuard]},
  {path: 'subject/:id', component: DetailSubjectCategoryComponent, canActivate: [AuthGuard]},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routingSubject)
  ]
})
export class RoutingSubjectCategoryModule { }
