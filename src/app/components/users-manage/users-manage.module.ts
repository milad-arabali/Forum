import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsersManageComponent} from "./users-manage.component";
import {DeleteUsersModule} from "./delete-users/delete-users.module";
import {ResetPassWordModule} from "../user-authentication/reset-pass-word/reset-pass-word.module";
import {DetailUsersManageModule} from "./detail-users-manage/detail-users-manage.module";
import {RoutingUsersManageModule} from "./routing-users-manage.module";
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatRadioModule} from "@angular/material/radio";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatMenuModule} from "@angular/material/menu";





@NgModule({
  declarations: [
    UsersManageComponent,


  ],
  imports: [
    CommonModule,
    DeleteUsersModule,
    ResetPassWordModule,
    DetailUsersManageModule,
    RoutingUsersManageModule,
    CdkDrag,
    CdkDropList,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterLink,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule
  ]
})
export class UsersManageModule { }
