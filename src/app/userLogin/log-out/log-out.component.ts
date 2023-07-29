import { Component } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent {

  constructor(private logOut: CookieService, private route: Router ,private dialogRef: MatDialogRef<LogOutComponent>) {
  }
  close() {

    this.dialogRef.close();

  }

  logout() {
    this.logOut.delete('login', 'true');
    this.route.navigate(['/signin'])
    this.dialogRef.close();
  }
}
