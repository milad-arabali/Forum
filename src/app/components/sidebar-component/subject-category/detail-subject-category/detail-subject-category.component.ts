import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
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
  test:number;
  userId: number;
  user?: SubjectCategoryModel;
  parentTitle?: SubjectCategoryModel;
  form: FormGroup;


  constructor(private router: ActivatedRoute,
              private http: HttpClient,
              private subjectCategoryService: SubjectCategoryService,
              private fb: FormBuilder,
              private api: ApiService,
              private snack: MatSnackBar,
              private dialog: MatDialog,
              private dateAdapter: DateAdapter<any>) {
    this.dateAdapter.setLocale('fa-IR');
    this.form = this.fb.group({
      title: ['', [Validators.required,Validators.maxLength(5)]],
      parent: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', [Validators.required,Validators.max(10),Validators.min(1)]]

    })
  }

  ngAfterViewInit()
  {
    const a= this.subjectCategoryService.selectParentId$.subscribe(
      a=>{
        this.test=a;
        console.log("dsdsdsddddd",this.test)


        this.http.get<SubjectCategoryModel[]>('http://localhost:3000/subject-category').subscribe(
          response => {
            this.parentTitle = response.find(test => test.id === this.test)
            console.log(this.parentTitle.title,"dddd")
            console.log("eewewewe")
            this.form.controls['parent'].setValue(this.parentTitle.title)
          })
      }

    )



  }
  ngOnInit() {
    this.userId = this.router.snapshot.params['id']
    // console.log('userid', this.userId)
    // this.http.get<SubjectCategoryModel[]>('http://localhost:3000/subject-category').subscribe(
    //   respose => {
    //     this.user = respose.find(a => a.id === +this.userId)
    //
    //     this.showSubjectCategoryConfig(this.user)
    //     console.log("fsfsf", this.user)
    //   }
    // )



  }


  showSubjectCategoryConfig(id: SubjectCategoryModel) {
    this.form.setValue({

        parent: id.title,


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

  selectParent() {
    console.log("dsdsdsd")
    const dialogRef = this.dialog.open(SelectParentComponent)
    dialogRef.afterClosed()
  }
}
