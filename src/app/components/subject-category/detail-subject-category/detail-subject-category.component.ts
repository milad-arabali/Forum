import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router, UrlSegment} from "@angular/router";
import {SubjectCategoryService} from "../subject-category.service";
import {SubjectCategoryModel} from "../../../shared/model/subject-category.model";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../shared/services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DateAdapter} from "@angular/material/core";
import {MatDialog} from "@angular/material/dialog";
import {SelectParentComponent} from "../select-parent/select-parent.component";
import {FormMode} from "../../../shared/enumeration/form-mode.enum";

@Component({
  selector: 'app-detail-subject-category',
  templateUrl: './detail-subject-category.component.html',
  styleUrls: ['./detail-subject-category.component.css']
})
export class DetailSubjectCategoryComponent implements OnInit {
  formMode: FormMode = FormMode.ADD;
  id: number;
  form: FormGroup;
  subjectModel = new SubjectCategoryModel();
  constructor(private router: ActivatedRoute,
              private http: HttpClient,
              private subjectCategoryService: SubjectCategoryService,
              private fb: FormBuilder,
              private api: ApiService,
              private snack: MatSnackBar,
              private dialog: MatDialog,
              private route: Router,
              private activateRoute: ActivatedRoute) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255),
        Validators.pattern('^[0-9a-zA-Z\u0600-\u06FF\\s\\.\\,\\-\\(\\)\\:\\?]+$')]],
      parentId: [-1],
      parentTitle: [''],
      status: [true, Validators.required],
      createDateTime: [Date()],
      hasChild: [false],
      priority: [1, [Validators.required, Validators.min(1)]]
    })
  }

  ngOnInit() {
    this.id = this.router.snapshot.params['id']
    this.activateRoute.url.subscribe((url: UrlSegment[]) => {
      if (url[1].path === '') {
        this.formMode = FormMode.VIEW;
        this.api.getSubjectCategory(this.id).subscribe(
          value => {
            this.form.controls['title'].setValue(value.title)
            this.form.controls['priority'].setValue(value.priority)
            this.form.controls['status'].setValue(value.status)
          }
        )
      } else if (url[1].path === 'add') {
        this.formMode = FormMode.ADD;
        if (this.id > 0) {
          this.api.getSubjectCategory(this.id).subscribe(
            value => {
              this.form.controls['parentId'].setValue(value.id)
              this.form.controls['parentTitle'].setValue(value.title)
            })
        }
      } else if (url[1].path === 'edit') {
        this.api.getSubjectCategory(this.id).subscribe(
          value => {
            this.form.controls['title'].setValue(value.title)
            this.form.controls['priority'].setValue(value.priority)
            this.form.controls['status'].setValue(value.status)
          }
        )
        this.formMode = FormMode.EDIT;
      }
    })
  }

  enableBtn() {
    this.subjectCategoryService.disableBtn$.next(false)
  }

  editSubjectCategory() {

    if (this.formMode === FormMode.ADD) {

      if (this.form.controls['parentId'].value !== -1) {
        const hasChild=new SubjectCategoryModel();
        hasChild.hasChild=true;
        this.api.updateSubjectCategory(hasChild,this.form.controls['parentId'].getRawValue()).subscribe(
          a=>{
          console.log("true")
          }
        )

      } else {
        this.form.controls['parentId'].setValue(-1)
      }
      this.form.removeControl('parentTitle')
      this.subjectModel = this.form.getRawValue()
      let s = this.api.addSubjectCategory(this.subjectModel).subscribe(
        res => {
          this.snack.open("اطلاعات دسته بندی با موفقیت ذخیره شد", "", {
            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top"
          })
        });
      this.route.navigate(['/subject-category'])
    }
    // else if(this.formMode=== FormMode.EDIT) {
    //   this.subjectModel.title = this.form.controls['title'].value
    //   if (this.form.controls['parentId'].value === '') {
    //     this.subjectModel.parentId = -1
    //   } else {
    //     this.subjectModel.parentId = this.form.controls['parentId'].value
    //     this.changeHaseChild.hasChild = true;
    //     // this.api.updateSubjectCategory(this.changeHaseChild,this.subjectModel.parentId)
    //     this.api.updateSubjectCategory(this.changeHaseChild, this.subjectModel.parentId)
    //       .subscribe({
    //         next: value => {
    //           console.log(value)
    //         }
    //       })
    //     this.subjectModel.hasChild = false
    //   }
    //   this.subjectModel.priority = this.form.controls['priority'].value
    //   this.subjectModel.status = this.form.controls['status'].value
    //   let s = this.api.addSubjectCategory(this.subjectModel).subscribe(
    //     res => {
    //       this.snack.open("اطلاعات دسته بندی با موفقیت ذخیره شد", "", {
    //         duration: 3000,
    //         horizontalPosition: "end",
    //         verticalPosition: "top"
    //       })
    //     });
    //   this.route.navigate(['/subject-category'])
    // }
  }

  selectParent() {
    const dialogRef = this.dialog.open(SelectParentComponent)
    dialogRef.afterClosed().subscribe(result => {
      this.form.controls['parentId'].setValue(result.id)
      this.form.controls['parentTitle'].setValue(result.title)

    })
  }
}
