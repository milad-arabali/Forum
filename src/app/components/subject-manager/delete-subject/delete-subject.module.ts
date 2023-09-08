import {NgModule} from "@angular/core";
import { DeleteSubjectComponent } from './delete-subject.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [





    DeleteSubjectComponent
  ],
    imports: [
        MatButtonModule,
        MatDialogModule,
        TranslateModule

    ]
})
export class DeleteSubjectModule{}
