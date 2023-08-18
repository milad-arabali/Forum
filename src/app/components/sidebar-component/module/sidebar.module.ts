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
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatRadioModule} from "@angular/material/radio";
import {CdkContextMenuTrigger} from "@angular/cdk/menu";
import {MatMenuModule} from "@angular/material/menu";



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
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatRadioModule,
    CdkContextMenuTrigger,
    MatMenuModule
  ]
})
export class SidebarModule { }
