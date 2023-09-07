import {NgModule} from "@angular/core";
import { SelectSubjectComponent } from './select-subject.component';
import {TranslateModule} from "@ngx-translate/core";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatTreeModule} from "@angular/material/tree";
import {MatListModule} from "@angular/material/list";
import {NgIf} from "@angular/common";


@NgModule({
  declarations: [


      SelectSubjectComponent
  ],
  imports: [

    TranslateModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatTreeModule,
    MatListModule,
    NgIf

  ]
})
export class SelectSubjectModule{}
