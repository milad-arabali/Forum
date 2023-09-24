import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserLoginService} from "../../user-authentication/sign-in-user/shared/services/user-login.service";
import {ApiService} from "../../../shared/services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {UserAccountInformationModel} from "../../../shared/model/user-account-information.model";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {DateAdapter} from "@angular/material/core";
import {TranslateService} from "@ngx-translate/core";
import {checkNationalCode} from "../../../shared/directive/natonal-code-validator.directive";


@Component({
  selector: 'app-edit-user-module',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  form: FormGroup;
  gender: string[] = ['مرد', 'زن']
  a: boolean = true;
  minDate:Date;
  maxDate:Date;

  constructor(private route: ActivatedRoute,
              private Fb: FormBuilder,
              private userEditForm: UserLoginService,
              private httpClient: HttpClient,
              private api: ApiService,
              public snack: MatSnackBar,
              private c: CookieService,
              private dateAdapter: DateAdapter<any>,
              private translate: TranslateService
  ) {
    this.minDate = new Date(1990, 0, 1);
    this.maxDate = new Date(2016,0,1);
    translate.addLangs(['fa', 'klingon']);
    translate.setDefaultLang('fa');
    translate.use('fa');
    this.dateAdapter.setLocale('fa-IR');
    this.form = this.Fb.group(
      {
        userName: ['', [Validators.required]],
        name: ['', [Validators.required, Validators.pattern('^[\u0600-\u06FF\\s]+$')]],
        nameFamily: ['', [Validators.required, Validators.pattern('^[\u0600-\u06FF\\s]+$')]],
        nationalCode: ['', [ Validators.minLength(10), Validators.maxLength(10),
          checkNationalCode()]],
        gender: ['', [Validators.required]],
        DateOfBirth: ['', ]

      }
    )
  }


  username1 = this.c.get('users')
  r: UserAccountInformationModel;
  userId: number;

  ngOnInit() {
    const api = this.api.apiUrl;
    let users1 = this.httpClient.get<UserAccountInformationModel[]>(`${api}`).subscribe(
      res => {
        this.r = res.find(
          x => x.userName === this.username1,
        )
        this.showUserConfig(this.r)
        this.userId = this.r.id
        // this.userId=this.r.id;
        // this.userId = res.find(
        //   x => x.userName === this.username1,
        // ).id
      })


  }

  showUserConfig(user: UserAccountInformationModel) {
    this.form.setValue({
        userName: user.userName,
        name: user.name,
        nameFamily: user.nameFamily,
        nationalCode: user.nationalCode,
        gender: user.gender,
        DateOfBirth: user.DateOfBirth
      }
    )
  }

  submit() {
    const userId = this.userId



    let s = this.api.updateRegisterUser(this.form.value, this.r.id).subscribe(
      res => {
        this.snack.open(this.translate.instant('snackbar.edit-account'), "", {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top"
        })
        this.userEditForm.showUserName$.next(this.form.value.name)
        this.userEditForm.showUserLastName$.next(this.form.value.nameFamily)

      })

  }

  resetDateOfBirth() {
    this.form.controls['DateOfBirth'].reset()
  }
}
