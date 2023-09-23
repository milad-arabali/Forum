import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewCommentsComponent} from "./view-comments.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {FooterModule} from "../../../core/layout/theme/footer/footer.module";



@NgModule({
  declarations: [
    ViewCommentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterLink,
    FooterModule
  ]
})
export class ViewCommentsModule { }
