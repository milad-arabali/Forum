import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectParentComponent } from './select-parent.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatTreeModule} from "@angular/material/tree";
import {TranslateModule} from "@ngx-translate/core";




@NgModule({
  declarations: [

        SelectParentComponent
  ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatListModule,
        MatProgressBarModule,
        MatIconModule,
        MatTreeModule,
        TranslateModule
    ]
})
export class SelectParentModule { }
