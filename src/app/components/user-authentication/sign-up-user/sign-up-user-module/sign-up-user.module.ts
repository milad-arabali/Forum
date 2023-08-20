import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignupUserComponent} from "../signup-user.component";
import {TranslateModule} from "@ngx-translate/core";
import {MatCardModule} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatRadioModule} from "@angular/material/radio";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    SignupUserComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatCardModule,
    RouterLink,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class SignUpUserModule { }
