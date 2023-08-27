import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResetPassWordComponent} from "./reset-pass-word.component";
import {MatCardModule} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    ResetPassWordComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    TranslateModule,
    RouterLink,
    MatButtonModule
  ]
})
export class ResetPassWordModule { }
