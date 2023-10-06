import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SubjectMangerModel} from "../../shared/model/subject-manger.model";
import {ForumService} from "./shared/services/forum.service";
import {TranslateService} from "@ngx-translate/core";
import {ApiService} from "../../shared/services/api.service";
import {SelectCategoryComponent} from "./select-category/select-category.component";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  subjectManager!: SubjectMangerModel[];
  categoryId: number;
  categoryTitle: string;

  constructor(private dialog: MatDialog,
              private forumServices: ForumService,
              private translate:TranslateService,
              private api:ApiService,
  ) {
  }

  ngOnInit() {

  }

  selectCategory() {
    const dialogRef = this.dialog.open(SelectCategoryComponent)
    dialogRef.afterClosed().subscribe(result => {
      this.api.getSubjectCategory(result.id).subscribe(
        value => {
          this.forumServices.findSubject(value.id).subscribe(
            value => {
              if(value[0].status===true){
                this.subjectManager=value
              }
            }
          )
          this.categoryTitle=result.title
        })

    })
  }


  reset() {
    this.categoryTitle=''
    this.subjectManager=[]
  }
}
