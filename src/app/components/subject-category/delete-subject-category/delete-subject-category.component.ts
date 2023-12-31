import {Component, Inject, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import {SubjectCategoryService} from "../shared/services/subject-category.service";
import {ApiService} from "../../../shared/services/api.service";
import {SubjectCategoryModel} from "../../../shared/model/subject-category.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-delete-subject-category',
  templateUrl: './delete-subject-category.component.html',
  styleUrls: ['./delete-subject-category.component.css']
})
export class DeleteSubjectCategoryComponent implements OnInit {
  id: number;
  parentId: number;

  constructor(private logOut: CookieService,
              private route: Router,
              private subjectCategoryService: SubjectCategoryService,
              private api: ApiService,
              private snack: MatSnackBar,
              private http: HttpClient,
              private dialogRef: MatDialogRef<DeleteSubjectCategoryComponent>,
              private translate: TranslateService,
              @Inject(MAT_DIALOG_DATA) private data
  ) {
    translate.addLangs(['fa', 'klingon']);
    translate.setDefaultLang('fa');
    translate.use('fa');
  }

  ngOnInit() {
    this.api.getSubjectCategory(this.data.id).subscribe(
      value => {
        this.parentId = value.parentId
      })
  }

  close() {
    this.dialogRef.close();
  }

  delete() {
    setTimeout(() => {
      this.api.getAllSubjectCategory()
        .subscribe(value => {
          let subject = value.find((a: any) => {
            return a.parentId === this.parentId
          })
          if (!subject) {
            let subjectModel = new SubjectCategoryModel()
            subjectModel.hasChild = false;
            this.api.updateSubjectCategory(subjectModel, this.parentId)
              .subscribe(value=>
              console.log("true"))
          } else if (subject) {
            let subjectModel = new SubjectCategoryModel()
            subjectModel.hasChild = true;
            this.api.updateSubjectCategory(subjectModel, this.parentId)
              .subscribe(value=>
                console.log("true"))
          }
        })
    }, 100)
    this.api.deleteSubjectCategory(this.data.id).subscribe(
      a => {
        this.snack.open(this.translate.instant('snackbar.subject-delete-value'), "", {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top"
        })
      })
    this.dialogRef.close();

  }
}
