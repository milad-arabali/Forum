import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserLoginService} from "../services/user-login.service";
import {ApiService} from "../../../../share/services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {userAccountModel} from "../model/useraccount.model";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {DateAdapter} from "@angular/material/core";
import {checkNationalCode} from "../directive/natonal-code-validator.directive";


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  form: FormGroup;
  gender: string[] = ['مرد', 'زن']
  a: boolean = true;

  constructor(private route: ActivatedRoute,
              private Fb: FormBuilder,
              private userEditForm: UserLoginService,
              private httpClient: HttpClient,
              private api: ApiService,
              public snack: MatSnackBar,
              private c: CookieService,
              private dateAdapter: DateAdapter<any>) {
    this.dateAdapter.setLocale('fa-IR');
    this.form = this.Fb.group(
      {
        userName: ['', [Validators.required]],

        name: ['', [Validators.required, Validators.pattern('^[\u0600-\u06FF\\s]+$')]],
        nameFamily: ['', [Validators.required, Validators.pattern('^[\u0600-\u06FF\\s]+$')]],
        nationalCode: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10),
          checkNationalCode()]],
        gender: ['', [Validators.required]],
        DateOfBirth: ['', [Validators.required]]

      }
    )
  }


  username1 = this.c.get('users')
  r: userAccountModel;
  userId: number;

  ngOnInit() {
    const api = this.api.apiUrl;
    let users1 = this.httpClient.get<userAccountModel[]>(`${api}`).subscribe(
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

  showUserConfig(user: userAccountModel) {
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
    let s = this.api.updateRegisterUser(this.form.value, this.r.id).subscribe(res => {
      this.snack.open("حساب کاربری با موفقیت ویرایش شد", "", {
        duration: 3000,
        horizontalPosition: "end",
        verticalPosition: "top"
      })


    })

  }
}
