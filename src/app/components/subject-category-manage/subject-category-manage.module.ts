import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetailSubjectCategoryModule} from "./detail-subject-category/detail-subject-category.module";
import {DeleteSubjectCategoryModule} from "./delete-subject-category/delete-subject-category.module";
import {SubjectCategoryModule} from "./subject-category/subject-category.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DetailSubjectCategoryModule,
    DeleteSubjectCategoryModule,
    SubjectCategoryModule
  ]
})
export class SubjectCategoryManageModule { }
