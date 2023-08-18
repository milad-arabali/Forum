import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SubjectCategoryComponent} from "../subject-category/subject-category.component";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {TranslateModule} from "@ngx-translate/core";
import {MatButtonModule} from "@angular/material/button";
import {MatTreeModule} from "@angular/material/tree";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink, RouterOutlet} from "@angular/router";
import {EditSubjectCategoryComponent} from "../subject-category/edit-subject-category/edit-subject-category.component";



@NgModule({
  declarations: [
    SubjectCategoryComponent,
    EditSubjectCategoryComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    TranslateModule,
    MatButtonModule,
    MatTreeModule,
    MatProgressBarModule,
    MatIconModule,
    RouterOutlet,
    RouterLink
  ]
})
export class SidebarModule { }
