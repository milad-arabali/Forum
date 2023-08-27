import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LogOutComponent} from "./log-out.component";
import {MatDialogModule} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    LogOutComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    TranslateModule,
    MatButtonModule
  ]
})
export class LogOutModule { }
