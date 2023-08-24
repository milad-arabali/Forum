import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetailSubjectCategoryComponent} from "../detail-subject-category.component";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatRadioModule} from "@angular/material/radio";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {SelectParentModule} from "../select-parent/select-parent-module/select-parent.module";
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    DetailSubjectCategoryComponent
  ],
    imports: [
        CommonModule,
        MatCardModule,
        ReactiveFormsModule,
        MatListModule,
        MatInputModule,
        MatDatepickerModule,
        MatRadioModule,
        RouterLink,
        MatButtonModule,
        SelectParentModule,
        MatIconModule,
        TranslateModule
    ]
})
export class DetailSubjectCategoryModule { }
