import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ForumComponent} from "./forum.component";
import {RoutingForumModule} from "./routing-forum.module";
import {TranslateModule} from "@ngx-translate/core";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {SelectCategoryModule} from "./select-category/select-category.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {ReactiveFormsModule} from "@angular/forms";
import {FooterModule} from "../../core/layout/theme/footer/footer.module";
import {RouterLink} from "@angular/router";
import {ForumCommentComponent} from "./forum-comment/forum-comment.component";
import {ForumCommentModule} from "./forum-comment/forum-comment.module";


@NgModule({
  declarations: [
    ForumComponent,

  ],
  imports: [
    CommonModule,
    ForumCommentModule,
    RoutingForumModule,
    TranslateModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    SelectCategoryModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
    FooterModule,
    RouterLink
  ]
})
export class ForumModule {
}
