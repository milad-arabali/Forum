import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserAccountInformationModel} from "../../../shared/model/user-account-information.model";
import {ConfirmedValidator} from "../reset-password/confrim.validator";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {ApiService} from "../../../shared/services/api.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-reset-password-users',
  templateUrl: './reset-password-users.component.html',
  styleUrls: ['./reset-password-users.component.css']
})
export class ResetPasswordUsersComponent  implements OnInit{
  changePassword: FormGroup;
  @ViewChild("password") private _inputElement: ElementRef;
  id:number;
  constructor(private translate: TranslateService,
              private api:ApiService,
              private fb: FormBuilder,
              private logOut: CookieService,
              private route: Router ,
              private ActivateRoute: ActivatedRoute ,
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
    this.id = this.ActivateRoute.snapshot.params['id']
  }

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
