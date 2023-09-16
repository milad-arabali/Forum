import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";
import {ManageAccessUsersComponent} from "./manage-access-users.component";


@NgModule({
  declarations: [
    ManageAccessUsersComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    TranslateModule
  ]
})
export class ManageAccessUsersModule {
}
