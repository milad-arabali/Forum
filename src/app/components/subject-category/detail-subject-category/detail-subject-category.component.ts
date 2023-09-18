import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, UrlSegment} from "@angular/router";
import {SubjectCategoryService} from "../shared/services/subject-category.service";
import {SubjectCategoryModel} from "../../../shared/model/subject-category.model";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../shared/services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {SelectParentComponent} from "../select-parent/select-parent.component";
import {FormMode} from "../../../shared/enumeration/form-mode.enum";
import {TranslateService} from "@ngx-translate/core";
import {CookieService} from "ngx-cookie-service";


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
  parentId: number;
  currentParentId: number;

  constructor(private router: ActivatedRoute,
              private http: HttpClient,
              private subjectCategoryService: SubjectCategoryService,
              private fb: FormBuilder,
              private api: ApiService,
              private snack: MatSnackBar,
              private dialog: MatDialog,
              private route: Router,
              private activateRoute: ActivatedRoute,
              private translate: TranslateService,
              private cookie: CookieService) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255),
        Validators.pattern('^[0-9a-zA-Z\u0600-\u06FF\\s\\.\\,\\-\\(\\)\\:\\?]+$')]],
      parentId: [-1],
      parentTitle: [''],
      currentParentId: [],
      status: [true, Validators.required],
      createDateTime: [Date()],
      hasChild: [false],
      priority: [1, [Validators.required, Validators.min(1)]]
    })
  }

  ngOnInit() {
    this.id = this.router.snapshot.params['id']
    this.checkAdmin()
    // this.api.getSubjectCategory(this.id).subscribe(
    //   value => {
    //     this.currentParentId = value.parentId
    //   })
    this.activateRoute.url.subscribe((url: UrlSegment[]) => {
      if (url[1].path === 'add') {
        // console.log("url[2].path", url[2].path)
        this.formMode = FormMode.ADD;
        this.checkSubject(Number(url[2].path))
        this.api.getSubjectCategory(this.id).subscribe(
          value => {
            if (value.status === false) {
              this.snack.open(this.translate.instant('form.category-parent-error'), "", {
                duration: 3000,
                horizontalPosition: "end",
                verticalPosition: "top"
              })
              this.route.navigate(['/subject-category'])
            } else {
              if (this.id > 0) {
                this.api.getSubjectCategory(this.id).subscribe(
                  value => {
                    this.form.controls['parentId'].setValue(value.id)
                    this.form.controls['parentTitle'].setValue(value.title)
                    this.currentParentId = value.id
                  })

              }
            }
          }
        )

      } else if (url[1].path === 'edit') {
        this.checkSubject(Number(url[2].path))
        this.api.getSubjectCategory(this.id).subscribe(
          value => {
            // console.log(value.id)
            this.form.controls['title'].setValue(value.title)
            this.form.controls['priority'].setValue(value.priority)
            this.form.controls['status'].setValue(value.status)
            this.form.controls['currentParentId'].setValue(value.parentId)
            // this.parentId = value.parentId
            if (value.parentId !== -1) {
              this.api.getSubjectCategory(value.parentId).subscribe(
                res => {
                  this.form.controls['parentTitle'].setValue(res.title)
                  this.form.controls['parentId'].setValue(res.id)
                }
              )
              // this.form.controls['parentTitle'].setValue(value.title)
            } else {

            }
          }
        )
        this.formMode = FormMode.EDIT;
      } else if (url[1].path === this.id.toString()) {
        this.formMode = FormMode.VIEW;
        this.checkSubject(Number(url[1].path))
        this.api.getSubjectCategory(this.id).subscribe(
          value => {
            this.form.controls['title'].setValue(value.title)
            this.form.controls['priority'].setValue(value.priority)
            this.form.controls['status'].setValue(value.status)
            if (value.parentId === -1) {
              this.form.controls['parentTitle'].setValue(value.title)
            } else {
              this.api.getSubjectCategory(value.parentId).subscribe(
                res => {
                  this.form.controls['parentTitle'].setValue(res.title)
                }
              )
            }
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
          console.log("true")
        } else {
          this.snack.open(this.translate.instant('snackbar.subject-value-error'), "", {
            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top"
          })
          this.route.navigate(['/subject-category'])
        }
      })
  }

  checkAdmin() {
    let isAdmin;
    this.api.getIsAdmin(this.cookie.get('users')).subscribe(
      value => {
        isAdmin = value[0].isAdmin
        if (isAdmin) {
          console.log("true")
        } else {
          this.route.navigate(['/home'])
        }
      }
    )
  }

  addSubject(){
    if (this.form.controls['parentId'].value === -1){
      this.form.removeControl('parentTitle')
      this.form.removeControl('currentParentId')
      this.form.controls['hasChild'].setValue(false)

      let addSubject=new SubjectCategoryModel()
      addSubject= this.form.getRawValue()
      this.api.addSubjectCategory(addSubject)
        .subscribe(
          res => {
            this.snack.open(this.translate.instant('snackbar.subject-save-value'), "", {
              duration: 3000,
              horizontalPosition: "end",
              verticalPosition: "top"
            })
          }
        )
    }else {
      this.form.removeControl('parentTitle')
      this.form.removeControl('currentParentId')
      let hasChild = new SubjectCategoryModel();
      hasChild.hasChild = true;
      this.api.updateSubjectCategory(hasChild, this.form.controls['parentId'].value).subscribe()
      let addSubject=new SubjectCategoryModel()
      addSubject= this.form.getRawValue()
      this.api.addSubjectCategory(addSubject)
        .subscribe(
          res => {
            this.snack.open(this.translate.instant('snackbar.subject-save-value'), "", {
              duration: 3000,
              horizontalPosition: "end",
              verticalPosition: "top"
            })
          })


    }
    this.route.navigate(['/subject-category'])
  }
  editSubject(){

  }


  // editSubjectCategory() {
  //   if (this.formMode === FormMode.ADD) {
  //     if (this.form.controls['parentId'].value !== -1) {
  //       let hasChild = new SubjectCategoryModel();
  //       hasChild.hasChild = true;
  //       this.api.updateSubjectCategory(hasChild, this.form.controls['parentId'].value).subscribe()
  //     } else {
  //       this.form.controls['parentId'].setValue(-1)
  //
  //     }
  //     this.form.removeControl('parentTitle')
  //     this.form.removeControl('currentParentId')
  //     this.subjectModel = this.form.getRawValue()
  //     let s = this.api.addSubjectCategory(this.subjectModel).subscribe(
  //       res => {
  //         this.snack.open(this.translate.instant('snackbar.subject-save-value'), "", {
  //           duration: 3000,
  //           horizontalPosition: "end",
  //           verticalPosition: "top"
  //         })
  //       });
  //     this.form.controls['parentId'].setValue(-1)
  //     this.route.navigate(['/subject-category'])
  //
  //   } else if (this.formMode === FormMode.EDIT) {
  //     let editSubject = new SubjectCategoryModel();
  //     this.form.removeControl('parentTitle')
  //     this.api.getAllSubjectCategory()
  //       .subscribe(value => {
  //         let subject = value.find((a: any) => {
  //           return a.parentId === this.currentParentId
  //         })
  //         if (!subject) {
  //           let subjectModel = new SubjectCategoryModel()
  //           subjectModel.hasChild = true;
  //           this.api.updateSubjectCategory(subjectModel, this.currentParentId)
  //             .subscribe(value =>
  //               console.log("true"))
  //         } else if (subject) {
  //           let subjectModel = new SubjectCategoryModel()
  //           subjectModel.hasChild = false;
  //           this.api.updateSubjectCategory(subjectModel, this.currentParentId)
  //             .subscribe(value =>
  //               console.log("true"))
  //         }
  //       })
  //     if (this.form) {
  //       if (this.form.controls['parentId'].value !== -1) {
  //         const hasChild = new SubjectCategoryModel();
  //         hasChild.hasChild = true;
  //         this.form.removeControl('currentParentId')
  //         this.api.updateSubjectCategory(hasChild, this.form.controls['parentId'].getRawValue()).subscribe(
  //           a => {
  //             console.log("true")
  //           }
  //         )
  //       } else if (this.form.controls['parentId'].value === this.form.controls['currentParentId'].value) {
  //         const hasChild = new SubjectCategoryModel();
  //         this.form.removeControl('currentParentId')
  //         this.api.updateSubjectCategory(hasChild, this.form.controls['parentId'].getRawValue()).subscribe(
  //           a => {
  //             console.log("true")
  //           }
  //         )
  //       } else {
  //         this.form.removeControl('currentParentId')
  //         this.form.controls['parentId'].setValue(-1)
  //       }
  //       editSubject = this.form.getRawValue()
  //       this.api.updateSubjectCategory(editSubject, this.id).subscribe(
  //         res => {
  //           this.snack.open(this.translate.instant('snackbar.subject-edit-value'), "", {
  //             duration: 3000,
  //             horizontalPosition: "end",
  //             verticalPosition: "top"
  //           })
  //         }
  //       )
  //     }
  //     this.route.navigate(['/subject-category'])
  //   }
  // }

  selectParent() {
    const dialogRef = this.dialog.open(SelectParentComponent)
    dialogRef.afterClosed().subscribe(result => {
      this.form.controls['parentId'].setValue(result.id)
      this.form.controls['parentTitle'].setValue(result.title)
      if (this.form.controls['parentTitle'].value === this.form.controls['title'].value) {
        this.snack.open(this.translate.instant('snackbar.child-error'), "", {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top"
        })
        this.form.controls['parentTitle'].setValue('')
        // this.form.setErrors({Invalid:true})
      }
      this.api.getSubjectCategory(result.id).subscribe(
        value => {
          if (value.status === false) {
            this.snack.open(this.translate.instant('form.category-parent-error'), "", {
              duration: 3000,
              horizontalPosition: "end",
              verticalPosition: "top"
            })
            this.form.controls['parentTitle'].setValue('')
          }
        })
    })

  }
}
