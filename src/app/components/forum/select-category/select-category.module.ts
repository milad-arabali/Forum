import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SelectCategoryComponent} from "./select-category.component";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTreeModule} from "@angular/material/tree";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    SelectCategoryComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatProgressBarModule,
    MatTreeModule,
    TranslateModule
  ]
})
export class SelectCategoryModule { }
