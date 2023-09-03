import {NgModule} from "@angular/core";
import { SubjectManagerComponent } from './subject-manager.component';
import {SelectSubjectModule} from "./select-subject/select-subject.module";
import {RoutingSubjectCategoryModule} from "./routing-subject.module";

@NgModule({
  declarations: [




    SubjectManagerComponent,

  ],
  imports: [
    SelectSubjectModule,
    RoutingSubjectCategoryModule
  ]
})



export class SubjectManagerModule { }
