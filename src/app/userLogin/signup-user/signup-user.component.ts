import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserLoginService} from "../user-login.service";
import {ApiService} from "../../../share/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-signup-user',
  templateUrl: './signup-user.component.html',
  styleUrls: ['./signup-user.component.css']
})
export class SignupUserComponent implements AfterViewInit{
  @ViewChild("myInput") private _inputElement: ElementRef;

  gender: string[] = ['مرد', 'زن']
  form: FormGroup;

  constructor(private signUpfb: FormBuilder, private api: ApiService, private snack: MatSnackBar, private usersAth: UserLoginService, private cookie: CookieService, private c: CookieService) {
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
