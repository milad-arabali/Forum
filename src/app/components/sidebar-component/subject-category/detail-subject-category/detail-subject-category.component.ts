import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {SubjectCategoryService} from "../../services/subject-category.service";
import {SubjectCategoryModel} from "../model/subject-category.model";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../../../share/services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-detail-subject-category-module',
  templateUrl: './detail-subject-category.component.html',
  styleUrls: ['./detail-subject-category.component.css']
})
export class DetailSubjectCategoryComponent implements OnInit {
  c?: SubjectCategoryModel;
  userId: number;
  user?: SubjectCategoryModel;
  form: FormGroup;

  constructor(private router: ActivatedRoute,
              private http: HttpClient,
              private subjectCategoryService: SubjectCategoryService,
              private fb: FormBuilder,
              private api: ApiService,
              private snack: MatSnackBar,
              private dateAdapter: DateAdapter<any>) {
    this.dateAdapter.setLocale('fa-IR');
    this.form = this.fb.group({
      title: ['', Validators.required],
      createDateTime: ['', Validators.required],
      status: ['', Validators.required]

    })
  }

  ngOnInit() {
    this.userId = this.router.snapshot.params['id']
    console.log('userid', this.userId)
    this.http.get<SubjectCategoryModel[]>('http://localhost:3000/subject-category').subscribe(
      respose => {
        this.user = respose.find(a => a.id === +this.userId)

        this.showSubjectCategoryConfig(this.user)
        console.log("fsfsf", this.user)
      }
    )
    this.subjectCategoryService.disableBtn$.next(true)
  }


  showSubjectCategoryConfig(id: SubjectCategoryModel) {
    this.form.setValue({
        title: id.title,
        createDateTime: id.createDateTime,
        status: id.status,

      }
    )
  }

  enableBtn() {
    this.subjectCategoryService.disableBtn$.next(false)
  }

  editSubjectCategory() {
    this.subjectCategoryService.disableBtn$.next(false)
    let s = this.api.updateSubjectCategory(this.form.value, this.user.id).subscribe(
      res => {
        this.snack.open("اطلاعات دسته بندی با موفقیت ویرایش شد", "", {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top"
        })
      })

  }
}
