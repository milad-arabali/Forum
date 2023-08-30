import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "./footer.component";
import {TranslateModule} from "@ngx-translate/core";
import {TimePipe} from "../../../../shared/pipe/time.pipe";





@NgModule({
    declarations: [
        FooterComponent,
        TimePipe
    ],
  exports: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,

  ]
})
export class FooterModule { }
