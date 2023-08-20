import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChangePasswordComponent} from "../change-password.component";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    TranslateModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    RouterLink,
    MatListModule,
    MatButtonModule
  ]
})
export class ChangePasswordModule { }
