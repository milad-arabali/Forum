import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import {UserLoginService} from "../../../user-panel/services/user-login.service";
import {SubjectCategoryService} from "../../services/subject-category.service";
import {ApiService} from "../../../../../share/services/api.service";
import {SubjectCategoryModel} from "../model/subject-category.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-delete-subject-category',
  templateUrl: './delete-subject-category.component.html',
  styleUrls: ['./delete-subject-category.component.css']
})
export class DeleteSubjectCategoryComponent implements OnInit {
  id: number
  subjectCategory!: SubjectCategoryModel;

  constructor(private logOut: CookieService,
              private route: Router,
              private subjectCategoryService: SubjectCategoryService,
              private api: ApiService,
              private snack: MatSnackBar,
              private http: HttpClient,
              private dialogRef: MatDialogRef<DeleteSubjectCategoryComponent>,
              translate: TranslateService,
  ) {
    translate.addLangs(['fa', 'klingon']);
    translate.setDefaultLang('fa');
    translate.use('fa');
  }

  ngOnInit() {
    this.subjectCategoryService.deleteSubject.subscribe(
      a => {
        this.id = a
      }
    )

    this.http.get<SubjectCategoryModel[]>('http://localhost:3000/subject-category').subscribe(
      response => {
        this.subjectCategory = response.find(a => a.id === this.id)

      }
    )
  }

  close() {

    this.dialogRef.close();

  }

  delete() {

    // console.log("dd",this.subjectCategory.hasChild)
    if (this.subjectCategory.hasChild === false) {
      this.api.deleteSubjectCategory(this.subjectCategory.id).subscribe(
        a => {
          this.snack.open("دسته بندی مورد نظر با موفقیت حذف شد.", "", {
            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top"
          })
        }
      )

    } else {
      this.snack.open("دسته بندی مورد نظر دارای فرزند است.", "", {
        duration: 3000,
        horizontalPosition: "end",
        verticalPosition: "top"
      })
    }
    this.dialogRef.close();

  }
}
