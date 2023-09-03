import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SubjectCategoryComponent} from "./subject-category.component";
import {MatMenuModule} from "@angular/material/menu";
import {RouterLink} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTreeModule} from "@angular/material/tree";
import {MatListModule} from "@angular/material/list";
import {TranslateModule} from "@ngx-translate/core";
import {SelectParentModule} from "./select-parent/select-parent.module";
import {DeleteSubjectCategoryModule} from "./delete-subject-category/delete-subject-category.module";
import {DetailSubjectCategoryModule} from "./detail-subject-category/detail-subject-category.module";
import {RoutingSubjectCategoryModule} from "./routing-subject-category.module";



@NgModule({
  declarations: [
    SubjectCategoryComponent,


  ],
  imports: [
    CommonModule,
    MatMenuModule,
    RouterLink,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatTreeModule,
    MatListModule,
    TranslateModule,
    SelectParentModule,
    DeleteSubjectCategoryModule,
    DetailSubjectCategoryModule,
    RoutingSubjectCategoryModule

  ]
})
export class SubjectCategoryModule { }
