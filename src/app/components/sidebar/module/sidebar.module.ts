import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SubjectCategoryComponent} from "../subject-category/subject-category.component";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {TranslateModule} from "@ngx-translate/core";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    SubjectCategoryComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    TranslateModule,
    MatButtonModule
  ]
})
export class SidebarModule { }
