import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {SubjectCategoryService} from "../../services/subject-category.service";
import {SubjectCategoryModel} from "../model/subject-category.model";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../../../share/services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DateAdapter} from "@angular/material/core";
import {MatDialog} from "@angular/material/dialog";
import {SelectParentComponent} from "./select-parent/select-parent.component";

@Component({
  selector: 'app-detail-subject-category',
  templateUrl: './detail-subject-category.component.html',
  styleUrls: ['./detail-subject-category.component.css']
})
export class DetailSubjectCategoryComponent implements OnInit , AfterViewInit {
  c?: SubjectCategoryModel;
  test: number;
  userId: number;
  user?: SubjectCategoryModel;
  parentTitle: SubjectCategoryModel;
  form: FormGroup;
  detail: boolean = false;
  showSubject: boolean = false;
  addSubject: boolean = false;


  constructor(private router: ActivatedRoute,
              private http: HttpClient,
              private subjectCategoryService: SubjectCategoryService,
              private fb: FormBuilder,
              private api: ApiService,
              private snack: MatSnackBar,
              private dialog: MatDialog,
              private dateAdapter: DateAdapter<any>,
              private route: Router) {

    this.dateAdapter.setLocale('fa-IR');
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255),
        Validators.pattern('')]],
      parentId: [''],
      status: ['', Validators.required],
      createDateTime: [Date()],
      hasChild: [''],
      priority: ['', [Validators.required, Validators.max(10), Validators.min(1)]]

    })
  }

  ngAfterViewInit() {

    const a = this.subjectCategoryService.selectParentId$.subscribe(
      a => {
        this.test = a;
        console.log("testId:", this.test)
        this.http.get<SubjectCategoryModel[]>('http://localhost:3000/subject-category').subscribe(
          response => {
            this.parentTitle = response.find(test => test.id === this.test)
            this.form.controls['parentId'].setValue(this.parentTitle.title)
            this.subjectCategoryService.editSubject$.subscribe(
              a => {
                if (a) {
                  this.detail = true
                  this.form.setValue(
                    {
                      title: this.parentTitle.title,
                      parentId: this.parentTitle.title,
                      status: this.parentTitle.status,
                      createDateTime: '',
                      hasChild: '',
                      priority: this.parentTitle.priority
                    }
                  )
                }
              }
            )
            this.subjectCategoryService.showSubject$.subscribe(
              a => {
                if (a) {
                  this.showSubject = true
                  this.detail = false
                  this.form.setValue(
                    {
                      title: this.parentTitle.title,
                      parentId: this.parentTitle.title,
                      status: this.parentTitle.status,
                      createDateTime: '',
                      hasChild: '',
                      priority: this.parentTitle.priority
                    }
                  )
                }
              }
            )

          })
      }
    )
    console.log(this.parentTitle)

  }

  ngOnInit() {
    this.userId = this.router.snapshot.params['id']


  }

  enableBtn() {
    this.subjectCategoryService.disableBtn$.next(false)
  }

  editSubjectCategory() {
    const subjectModel = new SubjectCategoryModel();
    if (!this.detail) {
      this.subjectCategoryService.disableBtn$.next(false)
      subjectModel.title = this.form.controls['title'].value
      if (this.form.controls['parentId'].value) {
        subjectModel.parentId = this.test
      } else {
        subjectModel.parentId = -1
      }

      subjectModel.createDateTime = this.form.controls['createDateTime'].value
      subjectModel.hasChild = false
      subjectModel.priority = this.form.controls['priority'].value
      subjectModel.status = this.form.controls['status'].value


      console.log(subjectModel);

      let s = this.api.addSubjectCategory(subjectModel).subscribe(
        res => {
          this.snack.open("اطلاعات دسته بندی با موفقیت ذخیره شد", "", {
            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top"
          })
        });
      this.route.navigate(['/subject-category'])


    } else {
      subjectModel.title = this.form.controls['title'].value
      subjectModel.priority = this.form.controls['priority'].value
      subjectModel.status = this.form.controls['status'].value

      let s = this.api.updateSubjectCategory(subjectModel,this.userId).subscribe(
        res => {
          this.snack.open("اطلاعات دسته بندی با موفقیت ویرایش شد", "", {
            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top"
          })
        });
      this.route.navigate(['/subject-category'])

    }
  }


  selectParent() {
    console.log("dsdsdsd")
    const dialogRef = this.dialog.open(SelectParentComponent)
    dialogRef.afterClosed()
  }
}
