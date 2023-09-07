import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router, UrlSegment} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SubjectCategoryService} from "../../subject-category/shared/services/subject-category.service";
import {ApiService} from "../../../shared/services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {FormMode} from "../../../shared/enumeration/form-mode.enum";
import {SelectSubjectComponent} from "../select-subject/select-subject.component";
import {SubjectService} from "../shared/services/subject.service";
import {CookieService} from "ngx-cookie-service";
import {DateAdapter} from "@angular/material/core";
import {SubjectMangerModel} from "../../../shared/model/subject-manger.model";


@Component({
  selector: 'app-detail-subject',
  templateUrl: './detail-subject.component.html',
  styleUrls: ['./detail-subject.component.css']
})
export class DetailSubjectComponent implements OnInit {
  formMode: FormMode = FormMode.ADD;
  id: number;
  form: FormGroup;
  parentId: number;
  date = new Date();
  name: string;

  constructor(private router: ActivatedRoute,
              private http: HttpClient,
              private subjectCategoryService: SubjectCategoryService,
              private fb: FormBuilder,
              private api: ApiService,
              private snack: MatSnackBar,
              private dialog: MatDialog,
              private route: Router,
              private activateRoute: ActivatedRoute,
              private dateAdapter: DateAdapter<any>,
              private subject: SubjectService,
              private cookie: CookieService,
              private snackBar: MatSnackBar,
  ) {
    this.dateAdapter.setLocale('fa-IR');
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255),
        Validators.pattern('^[0-9a-zA-Z\u0600-\u06FF\\s\\.\\,\\-\\(\\)\\:\\?]+$')]],
      parentId: [-1],
      categoryTitle: ['', Validators.required],
      creatorUser: [this.cookie.get('users')],
      status: [true, Validators.required],
      createDateTime: [this.date.toLocaleDateString()],
    })
  }

  ngOnInit() {
    this.id = this.router.snapshot.params['id']
    this.activateRoute.url.subscribe((url: UrlSegment[]) => {
      if (url[1].path === 'add') {
        this.formMode = FormMode.ADD;
        this.checkSubject(Number(url[2].path))

      } else if (url[1].path === 'edit') {
        this.checkSubject(Number(url[2].path))
        this.formMode = FormMode.EDIT;
        this.api.getSubject(this.id).subscribe(
          value => {
            this.form.controls['title'].setValue(value.title)
            this.form.controls['createDateTime'].setValue(value.createDateTime)
            this.form.controls['status'].setValue(value.status)
            this.form.controls['creatorUser'].setValue(value.creatorUser)
            this.form.controls['categoryTitle'].setValue(value.categoryTitle)
          }
        )
      } else if (url[1].path === this.id.toString()) {
        this.formMode = FormMode.VIEW;
        this.checkSubject(Number(url[1].path))
        this.formMode = FormMode.VIEW;
        this.checkSubject(Number(url[1].path))
        this.api.getSubject(this.id).subscribe(
          value => {
            this.form.controls['title'].setValue(value.title)
            this.form.controls['createDateTime'].setValue(value.createDateTime)
            this.form.controls['status'].setValue(value.status)
            this.form.controls['creatorUser'].setValue(value.creatorUser)
            this.form.controls['categoryTitle'].setValue(value.categoryTitle)
          }
        )
      }
    })
  }

  checkSubject(url: number) {
    this.subjectCategoryService.checkId().subscribe(
      value => {
        let path = url
        let id = value.find((a) => a.id === path)
        if (Number.isInteger(path) && id) {

        } else {
          this.snack.open("دسته بندی مورد نظر وجود ندارد.", "", {
            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top"
          })
          this.route.navigate(['subject'])
        }
      })
  }

  editSubjectCategory() {
    if (this.formMode === FormMode.ADD) {
      let subject = new SubjectMangerModel();
      // this.form.removeControl('parentTitle')
      subject = this.form.getRawValue()
      let s = this.api.addSubject(subject).subscribe(
        res => {
          this.snack.open("اطلاعات دسته بندی با موفقیت ذخیره شد", "", {
            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top"
          })
        });
      this.route.navigate(['/subject'])
    }
    else if (this.formMode === FormMode.EDIT) {
      let editSubject = new SubjectMangerModel();
      if (this.form) {
        editSubject = this.form.getRawValue()
        this.api.updateSubject(editSubject,this.id).subscribe(
          res => {
            this.snack.open("اطلاعات  با موفقیت ویرایش شد", "", {
              duration: 3000,
              horizontalPosition: "end",
              verticalPosition: "top"
            })
          }
        )
      }
      this.route.navigate(['/subject'])
    }
  }

  selectCategory() {
    const dialogRef = this.dialog.open(SelectSubjectComponent)
    dialogRef.afterClosed().subscribe(result => {
      this.form.controls['parentId'].setValue(result.id)
      this.form.controls['categoryTitle'].setValue(result.title)
    })
  }
}
