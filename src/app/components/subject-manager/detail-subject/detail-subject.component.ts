import {Component, OnInit} from '@angular/core';
import {FormMode} from "../../../shared/enumeration/form-mode.enum";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SubjectCategoryModel} from "../../../shared/model/subject-category.model";
import {ActivatedRoute, Router, UrlSegment} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SubjectCategoryService} from "../../subject-category/shared/services/subject-category.service";
import {ApiService} from "../../../shared/services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-detail-subject',
  templateUrl: './detail-subject.component.html',
  styleUrls: ['./detail-subject.component.css']
})
export class DetailSubjectComponent implements OnInit{
  formMode: FormMode = FormMode.ADD;
  id: number;
  form: FormGroup;
  subjectModel = new SubjectCategoryModel();
  parentId: number;


  constructor(private router: ActivatedRoute,
              private http: HttpClient,
              private subjectCategoryService: SubjectCategoryService,
              private fb: FormBuilder,
              private api: ApiService,
              private snack: MatSnackBar,
              private dialog: MatDialog,
              private route: Router,
              private activateRoute: ActivatedRoute,
              private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255),
        Validators.pattern('^[0-9a-zA-Z\u0600-\u06FF\\s\\.\\,\\-\\(\\)\\:\\?]+$')]],
      parentId: [-1],
      parentTitle: [''],
      currentParentId:[],
      status: [true, Validators.required],
      createDateTime: [Date()],
      hasChild: [false],
      priority: [1, [Validators.required, Validators.min(1)]]
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
      } else if (url[1].path === this.id.toString()) {
        this.formMode = FormMode.VIEW;
        this.checkSubject(Number(url[1].path))
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
    // if (this.formMode === FormMode.ADD) {
    //   if (this.form.controls['parentId'].value !== -1) {
    //     const hasChild = new SubjectCategoryModel();
    //     hasChild.hasChild = true;
    //     this.api.updateSubjectCategory(hasChild, this.form.controls['parentId'].getRawValue()).subscribe(
    //       a => {
    //         console.log("true")
    //       }
    //     )
    //   } else {
    //     this.form.controls['parentId'].setValue(-1)
    //   }
    //   this.form.removeControl('parentTitle')
    //   this.form.removeControl('currentParentId')
    //   this.subjectModel = this.form.getRawValue()
    //   let s = this.api.addSubjectCategory(this.subjectModel).subscribe(
    //     res => {
    //       this.snack.open("اطلاعات دسته بندی با موفقیت ذخیره شد", "", {
    //         duration: 3000,
    //         horizontalPosition: "end",
    //         verticalPosition: "top"
    //       })
    //     });
    //   this.route.navigate(['/subject-category'])
    // } else if (this.formMode === FormMode.EDIT) {
    //   let editSubject = new SubjectCategoryModel();
    //   this.form.removeControl('parentTitle')
    //
    //   this.api.getAllSubjectCategory()
    //     .subscribe(value => {
    //       let subject = value.find((a: any) => {
    //         return a.parentId === this.parentId
    //       })
    //       if (subject) {
    //         let subjectModel = new SubjectCategoryModel()
    //         subjectModel.hasChild = false;
    //         this.api.updateSubjectCategory(subjectModel, this.parentId)
    //           .subscribe()
    //       }
    //     })
    //   if (this.form) {
    //     if (this.form.controls['parentId'].value !== -1) {
    //       const hasChild = new SubjectCategoryModel();
    //       hasChild.hasChild = true;
    //       this.form.removeControl('currentParentId')
    //       this.api.updateSubjectCategory(hasChild, this.form.controls['parentId'].getRawValue()).subscribe(
    //         a => {
    //           console.log("true")
    //         }
    //       )
    //     } else if(this.form.controls['parentId'].value === this.form.controls['currentParentId'].value){
    //       const hasChild = new SubjectCategoryModel();
    //       this.form.removeControl('currentParentId')
    //       this.api.updateSubjectCategory(hasChild, this.form.controls['parentId'].getRawValue()).subscribe(
    //         a => {
    //           console.log("true")
    //         }
    //       )
    //     }
    //     else {
    //       this.form.removeControl('currentParentId')
    //       this.form.controls['parentId'].setValue(-1)
    //     }
    //     editSubject = this.form.getRawValue()
    //     this.api.updateSubjectCategory(editSubject, this.id).subscribe(
    //       res => {
    //         this.snack.open("اطلاعات دسته بندی با موفقیت ویرایش شد", "", {
    //           duration: 3000,
    //           horizontalPosition: "end",
    //           verticalPosition: "top"
    //         })
    //       }
    //     )
    //   }
    //   this.route.navigate(['/subject-category'])
    // }
  }
  selectParent() {
    // const dialogRef = this.dialog.open(SelectParentComponent)
    // dialogRef.afterClosed().subscribe(result => {
    //   this.form.controls['parentId'].setValue(result.id)
    //   this.form.controls['parentTitle'].setValue(result.title)
    //   if (this.form.controls['parentTitle'].value === this.form.controls['title'].value) {
    //     this.snack.open("والد یک دسته بندی موضوع نمی تواند خودش باشد.", "", {
    //       duration: 3000,
    //       horizontalPosition: "end",
    //       verticalPosition: "top"
    //     })
    //     this.form.controls['parentTitle'].setValue('')
    //     // this.form.setErrors({Invalid:true})
    //   }
    //
    // })
  }
}
