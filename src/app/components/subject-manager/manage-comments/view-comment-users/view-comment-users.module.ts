import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ViewCommentsUsersComponent} from "./view-comments-users.component";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    ViewCommentsUsersComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    TranslateModule,


  ]
})
export class ViewCommentUsersModule {
}
