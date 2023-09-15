import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordUsersComponent } from './reset-password-users.component';
import {MatCardModule} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    ResetPasswordUsersComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    TranslateModule,
    MatGridListModule,
    MatListModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ]
})
export class ResetPasswordUsersModule { }
