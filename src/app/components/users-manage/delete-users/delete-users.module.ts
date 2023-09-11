import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeleteUsersComponent} from "./delete-users.component";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    DeleteUsersComponent
  ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        TranslateModule
    ]
})
export class DeleteUsersModule { }
