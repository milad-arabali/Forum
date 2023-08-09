import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserLoginService} from "../../user-panel/services/user-login.service";
import {ApiService} from "../../../../share/services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CookieService} from "ngx-cookie-service";
import {TranslateService} from "@ngx-translate/core";
import {DateAdapter} from "@angular/material/core";


@Component({
  selector: 'app-sign-up-user',
  templateUrl: './signup-user.component.html',
  styleUrls: ['./signup-user.component.css']
})
export class SignupUserComponent implements AfterViewInit {
  @ViewChild("myInput") private _inputElement: ElementRef;
  gender: string[] = ['مرد', 'زن']
  form: FormGroup;

  constructor(private signUpfb: FormBuilder,
              private api: ApiService,
              private snack: MatSnackBar,
              private usersAth: UserLoginService,
              private cookie: CookieService,
              private c: CookieService,
              translate: TranslateService,
              private dateAdapter: DateAdapter<any>) {
    this.dateAdapter.setLocale('fa-IR');
    translate.addLangs(['fa', 'klingon']);
    translate.setDefaultLang('fa');
    translate.use('fa');
    this.form = this.signUpfb.group({
      userName: [, [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60),
        Validators.pattern('^[a-zA-Z0-9\-\_\/]+$')]],
      password: [, [Validators.required, Validators.required, Validators.minLength(5)]],
      name: [, [Validators.required]],
      nameFamily: [, [Validators.required]],
      nationalCode: [, [Validators.required]],
      gender: [, [Validators.required]],
      DateOfBirth: [, [Validators.required]]
    })
  }

  ngAfterViewInit() {

    this._inputElement.nativeElement.focus();
  }

  submit() {
    if (this.form.valid) {
      const name = this.form.value.userName;
      const value = this.form.value;

      this.usersAth.singIn(name, value)


    }

  }
}


// username: ['', [
//   Validators.required,
//   Validators.minLength(5),
//   Validators.maxLength(60),
//   Validators.pattern('^[a-zA-Z0-9\-\_\/]+$')
// ]],
//   Password: ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g),Validators.minLength(5)]],
