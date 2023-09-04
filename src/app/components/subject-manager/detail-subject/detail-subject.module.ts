import {NgModule} from "@angular/core";
import { DetailSubjectComponent } from './detail-subject.component';
import {MatCardModule} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [

    DetailSubjectComponent
  ],
  imports: [
    MatCardModule,
    TranslateModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    RouterLink,


  ]
})
export class DetailSubjectModule{}
