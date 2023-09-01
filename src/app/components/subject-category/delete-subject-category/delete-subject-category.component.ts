import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import {SubjectCategoryService} from "../subject-category.service";
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
  id: number
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
  }

  close() {
    this.dialogRef.close();
  }

  delete() {
    this.api.getSubjectCategory(this.id).subscribe(
      rez=>{
        if(rez.parentId === -1){
          const hasChild=new SubjectCategoryModel();
          this.api.getSubjectCategory(rez.parentId).subscribe(

          )
          this.api.updateSubjectCategory(hasChild,rez.parentId).subscribe(
            rez=>{
              console.log("true")
            }
          )
        }
      }
    )
    this.api.deleteSubjectCategory(this.id).subscribe(
      a => {

        this.snack.open("دسته بندی مورد نظر با موفقیت حذف شد.", "", {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top"
        })
      }
    )


    this.dialogRef.close();

  }
}
