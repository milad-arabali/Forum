import { Component } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent {

  constructor(private logOut: CookieService, private route: Router ,private dialogRef: MatDialogRef<LogOutComponent>,
              translate: TranslateService) {
    translate.addLangs(['fa', 'klingon']);
    translate.setDefaultLang('en');
    translate.use('fa');
  }

  close() {

    this.dialogRef.close();

  }

  logout() {
    this.logOut.delete('login', 'true');
    this.logOut.delete('users');
    this.route.navigate(['/signin'])
    this.dialogRef.close();
  }
}
