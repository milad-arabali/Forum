import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageCommentsComponent } from './manage-comments.component';
import {FooterModule} from "../../../core/layout/theme/footer/footer.module";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ViewCommentUsersModule} from "./view-comment-users/view-comment-users.module";
import {MatMenuModule} from "@angular/material/menu";




@NgModule({
  declarations: [
    ManageCommentsComponent,

  ],
    imports: [
        ViewCommentUsersModule,
        CommonModule,
        FooterModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        TranslateModule,
        RouterLink,
        CdkDrag,
        CdkDropList,
        MatPaginatorModule,
        MatProgressBarModule,
        MatSortModule,
        MatTableModule,
        MatTooltipModule,
        MatMenuModule
    ]
})
export class ManageCommentsModule { }
