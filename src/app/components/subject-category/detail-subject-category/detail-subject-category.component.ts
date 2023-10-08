import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, UrlSegment} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import {TreeSubjectService} from "../shared/services/tree-subject.service";
import {SubjectCategoryService} from "../shared/services/subject-category.service";
import {SelectParentComponent} from "../select-parent/select-parent.component";
import {FormMode} from "../../../shared/enumeration/form-mode.enum";
import {SubjectCategoryModel} from "../../../shared/model/subject-category.model";
import {ApiService} from "../../../shared/services/api.service";
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
  changeParentId:number;

  constructor(private router: ActivatedRoute,
              private http: HttpClient,
              private subjectCategoryService: SubjectCategoryService,
              private treeService: TreeSubjectService,
              private fb: FormBuilder,
              private api: ApiService,
              private snack: MatSnackBar,
              private dialog: MatDialog,
              private route: Router,
              private activateRoute: ActivatedRoute,
              private translate: TranslateService,
              private cookie: CookieService) {

    this.id = this.router.snapshot.params['id']
    this.checkAdmin()
    this.activateRoute.url.subscribe((url: UrlSegment[]) => {
      if (url[1].path === 'add') {
        // console.log("url[2].path", url[2].path)
        this.formMode = FormMode.ADD;
        if (url[2].path) {
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
              }
            }
          )
        }
      } else if (url[1].path === 'edit') {
        this.checkSubject(Number(url[2].path))
        this.formMode = FormMode.EDIT;
      } else if (url[1].path === this.id.toString()) {
        this.formMode = FormMode.VIEW;
        this.checkSubject(Number(url[1].path))
      }
    })
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255),
        Validators.pattern('^[0-9a-zA-Z\u0600-\u06FF\\s\\.\\,\\-\\(\\)\\:\\?]+$')]],
      parentId: [-1],
      parentTitle: [''],
      status: [true, Validators.required],
      createDateTime: [new Date()],
      hasChild: [false],
      priority: [1, [Validators.required, Validators.min(1)]]
    })
  }

  ngOnInit() {
    if (this.formMode === 2 || this.formMode === 1) {
      this.subjectCategoryService.getSubjectByID(this.id)
        .subscribe(value => {
          this.currentParentId = value.parentId
          this.form.setValue({
            title: value.title,
            parentId: value.parentId,
            parentTitle: '',
            status: value.status,
            createDateTime: '',
            hasChild: value.hasChild,
            priority: value.priority,
          })
        })
      setTimeout(() => {
        if (this.currentParentId === -1) {
          this.form.controls['parentTitle'].setValue('')
        } else {
          this.subjectCategoryService.getSubjectByID(this.currentParentId)
            .subscribe(result => {
              this.form.controls['parentTitle'].setValue(result.title)
            })
        }
      }, 100)
    } else if (this.formMode === 0) {
      this.subjectCategoryService.getSubjectByID(this.id)
        .subscribe(value => {
          this.currentParentId = value.parentId
          this.form.controls['parentId'].setValue(value.id)
        })
      setTimeout(() => {
        if (this.currentParentId === -1) {
          this.form.controls['parentTitle'].setValue('')
        } else {
          this.subjectCategoryService.getSubjectByID(this.currentParentId)
            .subscribe(result => {
              this.form.controls['parentTitle'].setValue(result.title)
            })
        }
      }, 100)
    }
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

  addSubject() {
    if (this.form.controls['parentId'].value === -1) {
      this.treeService.addSubject(
        {
          parentId: -1,
          title: this.form.controls['title'].value,
          createDateTime: new Date(),
          status: this.form.controls['status'].value,
          priority: this.form.controls['priority'].value,
          hasChild: false
        })
        .subscribe()
    } else {
      this.treeService.addSubject({
        parentId: this.form.controls['parentId'].value,
        title: this.form.controls['title'].value,
        createDateTime: new Date(),
        status: this.form.controls['status'].value,
        priority: this.form.controls['priority'].value,
        hasChild: false
      })
        .subscribe()
    }
    this.treeService.changeHasChild(this.form.controls['parentId'].value, {hasChild: true})
      .subscribe()
    this.snack.open(this.translate.instant('snackbar.subject-save-value'), "", {
      duration: 3000,
      horizontalPosition: "end",
      verticalPosition: "top"
    })
    this.route.navigate(['/subject-category'])
  }

  editSubject() {
    if (this.form.controls['parentId'].value === -1) {
      this.treeService.editSubject(this.id,
        {
          parentId: -1,
          title: this.form.controls['title'].value,
          status: this.form.controls['status'].value,
          priority: this.form.controls['priority'].value
        })
        .subscribe()
    } else {
      this.treeService.editSubject(this.id, {
        parentId: this.form.controls['parentId'].value,
        title: this.form.controls['title'].value,
        status: this.form.controls['status'].value,
        priority: this.form.controls['priority'].value
      })
        .subscribe()
    }
    this.treeService.changeHasChild(this.form.controls['parentId'].value, {hasChild: true})
      .subscribe()
    this.subjectCategoryService.getSubjectList()
      .subscribe(result => {
        const article = result.find((a: any) => {
          return a.parentId === this.currentParentId
        })
        if (!article) {
          this.treeService.changeHasChild(this.currentParentId, {hasChild: false})
            .subscribe()
        }
      })

    this.snack.open(this.translate.instant('snackbar.subject-edit-value'), "", {
      duration: 3000,
      horizontalPosition: "end",
      verticalPosition: "top"
    })
    this.route.navigate(['/subject-category'])
  }

  selectParent() {
    const dialogRef = this.dialog.open(SelectParentComponent)
    dialogRef.afterClosed().subscribe(result => {
      this.form.controls['parentId'].setValue(result.id)
      this.changeParentId = result.id
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

  deleteParentInput() {
    this.form.controls['parentTitle'].reset()
    this.form.controls['parentId'].setValue(-1)
  }
}

//   onArticleEdit(){
//     this.treeService.editArticle(this.currentNode ,this.articleForm.value)
//       .subscribe()
//     this.treeService.changeHasChild(this.articleForm.controls['parentId'].value , { hasChild : true} )
//       .subscribe()
//     this.articleCategoryService.getArticlList()
//       .subscribe(result =>{
//         const article = result.find((a : any) => {
//           return a.parentId === this.currentParentId
//         })
//         if (!article){
//           this.treeService.changeHasChild(this.currentParentId , {hasChild : false})
//             .subscribe()
//         }
//       })
//     this.router.navigate(['/article-category']).then()
//     this.snackBar.open(this.translate.instant('successful-edit') , '' ,{duration : 2000 , panelClass : ['p']})
//
//   }
// }

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
