import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../../core/guard/auth.guard";
import {SubjectCategoryComponent} from "./subject-category.component";
import {DetailSubjectCategoryComponent} from "./detail-subject-category/detail-subject-category.component";
import {IsAdminGuard} from "../../core/guard/is-admin.guard";

const routingSubjectCategory: Routes = [

  {path: 'subject-category', canActivate: [AuthGuard,IsAdminGuard], component: SubjectCategoryComponent},
  {path: 'subject-category/add/:id', component: DetailSubjectCategoryComponent, canActivate: [AuthGuard,IsAdminGuard]},
  {path: 'subject-category/edit/:id', component: DetailSubjectCategoryComponent, canActivate: [AuthGuard,IsAdminGuard]},
  {path: 'subject-category/:id', component: DetailSubjectCategoryComponent, canActivate: [AuthGuard,IsAdminGuard]},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routingSubjectCategory)
  ]
})
export class RoutingSubjectCategoryModule { }
