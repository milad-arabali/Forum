import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ManageVoteComponent} from "./manage-vote.component";
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
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";



@NgModule({
  declarations: [
    ManageVoteComponent
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
    FooterModule,
    CdkDrag,
    CdkDropList,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule
  ]
})
export class ManageVoteModule { }
