import {Component} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import {UserLoginService} from "../../user-authentication/sign-in-user/shared/services/user-login.service";

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent {

  constructor(private logOut: CookieService,
              private route: Router,
              private dialogRef: MatDialogRef<LogOutComponent>,
              translate: TranslateService,
              private loginservice: UserLoginService) {
    translate.addLangs(['fa', 'klingon']);
    translate.setDefaultLang('fa');
    translate.use('fa');
  }

  close() {

    this.dialogRef.close();

  }

  logout() {
    this.logOut.deleteAll();
    this.route.navigate(['/signin'])
    this.dialogRef.close();
    this.loginservice.showBTN$.next(false)
  }
}
