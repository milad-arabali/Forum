import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserAccountInformationModel} from "../../../shared/model/user-account-information.model";
import {ConfirmedValidator} from "./confrim.validator";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router, UrlSegment} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {ApiService} from "../../../shared/services/api.service";
import {TranslateService} from "@ngx-translate/core";
import {UsersManageService} from "../shared/services/users-manage.service";

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
              private snack:MatSnackBar,
              private userInformationServices: UsersManageService,
              private activateRoute:ActivatedRoute
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
    this.activateRoute.url.subscribe((url: UrlSegment[]) => {
      this.checkSubject(Number(url[2].path))
    })
  }

  submit() {
    let changePassword=new UserAccountInformationModel();
    changePassword.password=this.changePassword.controls['password'].value
    this.changePassword.reset();
    this._inputElement.nativeElement.focus();
    this.api.updatePasswordUser(changePassword,this.id).subscribe(
      value =>
        this.snack.open(this.translate.instant('snackbar.password-edit'), "", {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top"
        })

    )
    this.route.navigate(['./users-manage'])
  }
  checkSubject(url: number) {
    this.userInformationServices.checkId().subscribe(
      value => {
        let path = url
        let id = value.find((a) => a.id === path)
        if (Number.isInteger(path) && id) {

        } else {
          this.snack.open(this.translate.instant('snackbar.page-error'), "", {
            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top"
          })
          this.route.navigate(['/users-manage'])
        }
      })
  }
}
