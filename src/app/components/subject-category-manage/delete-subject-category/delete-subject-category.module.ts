import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeleteSubjectCategoryComponent} from "./delete-subject-category.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    DeleteSubjectCategoryComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    TranslateModule
  ]
})
export class DeleteSubjectCategoryModule { }
