import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";
import {MatListModule} from "@angular/material/list";
import {BarChartModule, PieChartModule} from "@swimlane/ngx-charts";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    TranslateModule,
    MatListModule,
    BarChartModule,
    MatButtonModule,
    PieChartModule
  ]
})
export class HomeModule { }
