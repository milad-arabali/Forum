import {Component, OnInit} from '@angular/core';
import {SelectSubjectComponent} from "../subject-manager/select-subject/select-subject.component";
import {MatDialog} from "@angular/material/dialog";
import {SubjectMangerModel} from "../../shared/model/subject-manger.model";
import {ForumService} from "./shared/services/forum.service";
import {TranslateService} from "@ngx-translate/core";

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
              private translate:TranslateService) {
  }

  ngOnInit() {

  }

  selectCategory() {
    const dialogRef = this.dialog.open(SelectSubjectComponent)
    dialogRef.afterClosed().subscribe(result => {
      this.forumServices.findSubject(result.id).subscribe(
        value => {
          if(value[0].status===true){
            this.subjectManager=value
          }

        }
      )
     this.categoryTitle=result.title
    })
  }
  changeStatusTitle(title: boolean) {
    if (title) {
      return this.translate.instant('form.status-true')
    } else {
      return this.translate.instant('form.status-false')
    }
  }
}
