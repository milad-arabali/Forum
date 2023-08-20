import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainComponent} from "../main.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";



@NgModule({
  declarations: [
    MainComponent
  ],
  exports: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    TranslateModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    RouterOutlet
  ]
})
export class MainModule { }
