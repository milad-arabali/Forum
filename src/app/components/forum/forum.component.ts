import {Component, OnInit} from '@angular/core';
import {SelectSubjectComponent} from "../subject-manager/select-subject/select-subject.component";
import {MatDialog} from "@angular/material/dialog";
import {SubjectMangerModel} from "../../shared/model/subject-manger.model";
import {ForumService} from "./shared/services/forum.service";
import {TranslateService} from "@ngx-translate/core";
import {ApiService} from "../../shared/services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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
              private snack:MatSnackBar) {
  }

  ngOnInit() {

  }

  selectCategory() {
    const dialogRef = this.dialog.open(SelectSubjectComponent)
    dialogRef.afterClosed().subscribe(result => {
      this.api.getSubjectCategory(result.id).subscribe(
        value => {
          if (value.status === false) {
            this.snack.open(this.translate.instant('form.category-parent-status'), "", {
              duration: 3000,
              horizontalPosition: "end",
              verticalPosition: "top"
            })
            this.categoryTitle=''
          }else {
            this.forumServices.findSubject(result.id).subscribe(
              value => {
                if(value[0].status===true){
                  this.subjectManager=value
                }

              }
            )
            this.categoryTitle=result.title
          }
        })

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
