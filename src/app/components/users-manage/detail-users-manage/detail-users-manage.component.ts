import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormMode} from "../../../shared/enumeration/form-mode.enum";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from "jalali-moment";
import {ActivatedRoute, Router, UrlSegment} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SubjectService} from "../../subject-manager/shared/services/subject.service";
import {ApiService} from "../../../shared/services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {DateAdapter} from "@angular/material/core";
import {CookieService} from "ngx-cookie-service";
import {TranslateService} from "@ngx-translate/core";
import {SubjectMangerModel} from "../../../shared/model/subject-manger.model";
import {UsersManageService} from "../shared/services/users-manage.service";
import {checkNationalCode} from "../../../shared/directive/natonal-code-validator.directive";
import {UserAccountInformationModel} from "../../../shared/model/user-account-information.model";

@Component({
  selector: 'app-detail-users-manage',
  templateUrl: './detail-users-manage.component.html',
  styleUrls: ['./detail-users-manage.component.css']
})
export class DetailUsersManageComponent implements OnInit {
  @ViewChild("userName") private _inputElement: ElementRef;
  gender  = [
    {Value: 'male', viewValue: 'مرد'},
    {Value: 'female', viewValue: 'زن'}
  ]
  formMode: FormMode = FormMode.ADD;
  id: number;
  manageUsersForm: FormGroup;
  parentId: number;
  date = moment().locale('fa');
  name: string;
  isAdmin: boolean[] = [true, false]
  status = [
    {statusValue: 'Registered', viewValue: 'ثبت نام اولیه شده'},
    {statusValue: 'reject', viewValue: 'لغو شده'},
    {statusValue: 'confirm', viewValue: 'تایید شده'},
  ];

  constructor(private router: ActivatedRoute,
              private http: HttpClient,
              private userInformationServices: UsersManageService,
              private fb: FormBuilder,
              private api: ApiService,
              private snack: MatSnackBar,
              private dialog: MatDialog,
              private route: Router,
              private activateRoute: ActivatedRoute,
              private dateAdapter: DateAdapter<any>,
              private subject: SubjectService,
              private cookie: CookieService,
              private translate: TranslateService
  ) {
    this.dateAdapter.setLocale('fa-IR');
    this.manageUsersForm = this.fb.group({
      userName: [, [
        Validators.minLength(5),
        Validators.maxLength(60),
        Validators.pattern('^[a-zA-Z0-9\-\_\/]+$')]],
      status: [,],
      name: [, [Validators.pattern('^[\u0600-\u06FF\\s]+$')]],
      nameFamily: [, [Validators.pattern('^[\u0600-\u06FF\\s]+$')]],
      nationalCode: [, [Validators.minLength(10), Validators.maxLength(10),
        checkNationalCode()]],
      gender: [, []],
      isAdmin: [, []],
      DateOfBirth: [, []]
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
        this.api.getUserInformation(this.id).subscribe(
          value => {
            this.manageUsersForm.controls['userName'].setValue(value.userName)
            this.manageUsersForm.controls['name'].setValue(value.name)
            this.manageUsersForm.controls['status'].setValue(value.status)
            this.manageUsersForm.controls['nameFamily'].setValue(value.nameFamily)
            this.manageUsersForm.controls['nationalCode'].setValue(value.nationalCode)
            this.manageUsersForm.controls['gender'].setValue(value.gender)
            this.manageUsersForm.controls['isAdmin'].setValue(value.isAdmin)
            this.manageUsersForm.controls['DateOfBirth'].setValue(value.DateOfBirth)
          }
        )
      } else if (url[1].path === this.id.toString()) {
        this.formMode = FormMode.VIEW;
        this.checkSubject(Number(url[1].path))
        this.api.getUserInformation(this.id).subscribe(
          value => {
            this.manageUsersForm.controls['userName'].setValue(value.userName)
            this.manageUsersForm.controls['name'].setValue(value.name)
            this.manageUsersForm.controls['status'].setValue(value.status)
            this.manageUsersForm.controls['nameFamily'].setValue(value.nameFamily)
            this.manageUsersForm.controls['nationalCode'].setValue(value.nationalCode)
            this.manageUsersForm.controls['gender'].setValue(value.gender)
            this.manageUsersForm.controls['isAdmin'].setValue(value.isAdmin)
            this.manageUsersForm.controls['DateOfBirth'].setValue(value.DateOfBirth)

          }
        )
      }
    })
  }

  checkSubject(url: number) {
    this.userInformationServices.checkId().subscribe(
      value => {
        let path = url
        let id = value.find((a) => a.id === path)
        if (Number.isInteger(path) && id) {

        } else {
          this.snack.open(this.translate.instant('snackbar.subject-manager-value-error'), "", {
            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top"
          })
          this.route.navigate(['/users-mange'])
        }
      })
  }

  editSubjectCategory() {
    if (this.formMode === FormMode.ADD) {
      let subject = new SubjectMangerModel();
      // this.form.removeControl('parentTitle')
      subject = this.manageUsersForm.getRawValue()
      let s = this.api.addSubject(subject).subscribe(
        res => {
          this.snack.open(this.translate.instant('snackbar.subject-manager-save-value'), "", {
            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top"
          })
        });
      this.route.navigate(['/users-mange'])
    } else if (this.formMode === FormMode.EDIT) {
      let editUsers = new UserAccountInformationModel();
      if (this.manageUsersForm) {
        editUsers = this.manageUsersForm.getRawValue()
        this.api.updateRegisterUser(editUsers, this.id).subscribe(
          res => {
            this.snack.open(this.translate.instant('snackbar.users-edit-value'), "", {
              duration: 3000,
              horizontalPosition: "end",
              verticalPosition: "top"
            })
          }
        )
      }
      this.route.navigate(['/users-mange'])
    }
  }

  isAdminUsersStatus(status: Boolean) {
    if (status === true) {
      return "بلی"
    } else {
      return "خیر"
    }
  }
}
