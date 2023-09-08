import {NgModule} from "@angular/core";
import { SubjectManagerComponent } from './subject-manager.component';
import {SelectSubjectModule} from "./select-subject/select-subject.module";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {TranslateModule} from "@ngx-translate/core";
import {MatRadioModule} from "@angular/material/radio";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {RouterLink} from "@angular/router";
import {RoutingSubjectModule} from "./routing-subject.module";
import {DeleteSubjectModule} from "./delete-subject/delete-subject.module";
import {DetailSubjectModule} from "./detail-subject/detail-subject.module";
import {NgIf} from "@angular/common";
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [




    SubjectManagerComponent,

  ],
    imports: [
        DeleteSubjectModule,
        DetailSubjectModule,
        SelectSubjectModule,
        RoutingSubjectModule,
        MatPaginatorModule,
        MatCardModule,
        MatButtonModule,
        MatTableModule,
        MatDatepickerModule,
        MatInputModule,
        TranslateModule,
        MatRadioModule,
        ReactiveFormsModule,
        MatIconModule,
        MatListModule,
        RouterLink,
        NgIf,
        MatSortModule
    ]
})



export class SubjectManagerModule { }
