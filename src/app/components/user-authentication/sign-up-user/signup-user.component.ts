import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserLoginService} from "../sign-in-user/shared/services/user-login.service";
import {ApiService} from "../../../shared/services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CookieService} from "ngx-cookie-service";
import {TranslateService} from "@ngx-translate/core";
import {DateAdapter} from "@angular/material/core";
import {checkNationalCode} from "../../../shared/directive/natonal-code-validator.directive";
import {Router} from "@angular/router";


@Component({
  selector: 'app-sign-up-user',
  templateUrl: './signup-user.component.html',
  styleUrls: ['./signup-user.component.css']
})
export class SignupUserComponent implements OnInit {
  @ViewChild("userName") private _inputElement: ElementRef;
  minDate: Date;
  maxDate: Date;
  form: FormGroup;
  checkUser:string;
  gender = [
    {Value: 'male', viewValue: 'مرد'},
    {Value: 'female', viewValue: 'زن'}
  ]

  constructor(private signUpfb: FormBuilder,
              private api: ApiService,
              private snack: MatSnackBar,
              private usersAth: UserLoginService,
              private cookie: CookieService,
              private c: CookieService,
              private translate: TranslateService,
              private router: Router,
              private dateAdapter: DateAdapter<any>) {
    this.minDate = new Date(1990, 0, 1);
    this.maxDate = new Date(2016, 0, 1);
    this.dateAdapter.setLocale('fa-IR');
    translate.addLangs(['fa', 'klingon']);
    translate.setDefaultLang('fa');
    translate.use('fa');
    this.form = this.signUpfb.group({
      userName: [, [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60),
        Validators.pattern('^[a-zA-Z0-9\-\_\/]+$'),]],
      password: [, [Validators.required, Validators.minLength(5)]],
      name: [, [Validators.required, Validators.pattern('^[\u0600-\u06FF\\s]+$')]],
      nameFamily: [, [Validators.required, Validators.pattern('^[\u0600-\u06FF\\s]+$')]],
      nationalCode: [, [Validators.minLength(10), Validators.maxLength(10),
        checkNationalCode()]],
      gender: ['male', [Validators.required]],
      DateOfBirth: [,],
      status: ['Registered',],
      isAdmin: [false, []],
      currentDate:[new Date()]
    })
  }


  ngOnInit() {
    const a = this.cookie.get('login')
    if (a) {
      this.router.navigate(['/home']);
    }
  }

  submit() {
    if (this.form.valid) {
      const name = this.form.value.userName;
      const name1 = this.form.value.name;
      const familyName = this.form.value.nameFamily;
      const value = this.form.value;

      this.usersAth.singIn(name, value, name1, familyName)


    }
    this.form.get('userName').reset();
    this.form.get('password').reset();
    this._inputElement.nativeElement.focus();
  }
  resetDateOfBirth() {
    this.form.controls['DateOfBirth'].reset()
  }

  // checkUserName($event) {
  //   console.log("Dsd", $event.target.value);
  //
  // }

  checkUserName(value : string) {
    this.api.getAllUsers().subscribe(users => {

      const user = users.find((a:any) => {
        return a.userName === value
      })
      if (user){
        this.form.controls['userName'].setErrors({exist  : true})
      }
    })
  }
  checkNationalCode(value : number) {
    this.api.getAllUsers().subscribe(users => {
      const checkFilter= users.filter(a=>a.nationalCode !== null)
      const user = checkFilter.find((a:any) => {
        return a.nationalCode === value
      })
      if (user){
        this.form.controls['nationalCode'].setErrors({existNationalCode  : true})
      }
    })
  }

}


// username: ['', [
//   Validators.required,
//   Validators.minLength(5),
//   Validators.maxLength(60),
//   Validators.pattern('^[a-zA-Z0-9\-\_\/]+$')
// ]],
//   Password: ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g),Validators.minLength(5)]],
