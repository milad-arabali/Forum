import {Component, ElementRef, ViewChild} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmedValidator} from "./confrim.validator";
import {ApiService} from "../../shared/services/api.service";
import {ChangePasswordService} from "./shared/services/change-password.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-password-module',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changePassword: FormGroup;
  username1 = this.c.get('users')
  userId: number;
  @ViewChild("oldPassword") private _inputElement: ElementRef;
  constructor(translate: TranslateService,
              private api:ApiService,
              private fb: FormBuilder,
              private changePasswordUser:ChangePasswordService,
              private logOut: CookieService,
              private route: Router ,
              private c: CookieService) {
    this.changePassword = this.fb.group({
        oldPassword: ['', [Validators.required]],
        newPassword: ['',  Validators.compose([Validators.required,Validators.minLength(5)])],
        cfmPassword: ['',  Validators.compose([Validators.required,Validators.minLength(5)])],


      },
      {
        validator: ConfirmedValidator('newPassword', 'cfmPassword')
      })

    translate.addLangs(['fa', 'klingon']);
    translate.setDefaultLang('fa');
    translate.use('fa');
  }

  get f() {

    return this.changePassword.controls;

  }


  submit() {
    const oldPassword=this.changePassword.value.oldPassword
    const newPassword=this.changePassword.value.newPassword
    this.changePasswordUser.checkPassword(oldPassword,newPassword,this.username1)
    this.changePassword.reset();
    this._inputElement.nativeElement.focus();
    this.logOut.deleteAll();
    this.route.navigate(['/signin'])
  }
}
