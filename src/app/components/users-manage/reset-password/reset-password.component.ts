import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {ApiService} from "../../../shared/services/api.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmedValidator} from "./confrim.validator";
import {UserAccountInformationModel} from "../../../shared/model/user-account-information.model";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  changePassword: FormGroup;
  @ViewChild("password") private _inputElement: ElementRef;
  id:number;
  constructor(private translate: TranslateService,
              private api:ApiService,
              private fb: FormBuilder,
              private logOut: CookieService,
              private route: Router ,

              private snack:MatSnackBar
  ) {
    this.changePassword = this.fb.group({
        password: ['',  Validators.compose([Validators.required,Validators.minLength(5)])],
        cfmPassword: ['',  Validators.compose([Validators.required,Validators.minLength(5)])],


      },
      {
        validator: ConfirmedValidator('password', 'cfmPassword')
      })

    translate.addLangs(['fa', 'klingon']);
    translate.setDefaultLang('fa');
    translate.use('fa');
  }

  ngOnInit() {
    // this.id = this.ActivatedRoute.snapshot.params['id']
  }

  // ngOnInit() {
  //   // this.id = this.ActivatedRoute.snapshot.params['id']
  // }

  submit() {
    let changePassword=new UserAccountInformationModel();
    changePassword.password=this.changePassword.controls['password'].value
    this.changePassword.reset();
    this._inputElement.nativeElement.focus();
    this.api.updatePasswordUser(changePassword,this.id).subscribe(
      value =>
        this.snack.open('تغییر یافت', "", {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top"
        })

    )
    // this.route.navigate(['./users-mange'])
  }
}
