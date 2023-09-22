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
    ReactiveFormsModule
  ]
})
export class ForumCommentModule { }
