import { NgModule } from '@angular/core';
import {SubjectCategoryModule} from "../subject-category/subject-category-module/subject-category.module";
import {HomeModule} from "../home/home.module";




@NgModule({
  declarations: [

  ],
  imports: [
  SubjectCategoryModule,
    HomeModule

  ]
})
export class SidebarModule { }
