import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ForumCommentComponent} from "./forum-comment.component";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {FooterModule} from "../../../core/layout/theme/footer/footer.module";
import {MatButtonToggleModule} from "@angular/material/button-toggle";



@NgModule({
  declarations: [
    ForumCommentComponent
  ],
    imports: [
        CommonModule,
        MatCardModule,
        MatListModule,
        TranslateModule,
        RouterLink,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        FooterModule,
        MatButtonToggleModule
    ]
})
export class ForumCommentModule { }
