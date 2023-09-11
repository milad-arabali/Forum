import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetailUsersManageComponent} from "./detail-users-manage.component";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";



@NgModule({
  declarations: [
    DetailUsersManageComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterLink,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule
  ]
})
export class DetailUsersManageModule { }
