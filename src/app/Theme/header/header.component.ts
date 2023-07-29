import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {UserLoginService} from "../../userLogin/user-login.service";
import {MatDialog} from "@angular/material/dialog";
import {LogOutComponent} from "../../userLogin/log-out/log-out.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
@Output() showSidebarEmitter: EventEmitter<boolean>=new EventEmitter<boolean>()
  sidebarStatus:boolean =true;
username : string;
 ngOnInit() {
   this.usernameLogin.selectedUser$.subscribe(
     user => this.username =user
   )
 }

  showSidebar() {
    this.sidebarStatus =!this.sidebarStatus;
    this.showSidebarEmitter.emit(this.sidebarStatus);
  }
  constructor(private logOut: CookieService , private  route : Router,private usernameLogin: UserLoginService , private  dialog: MatDialog) {
  }
  logout() {
    const dialogRef = this.dialog.open(LogOutComponent)
    dialogRef.afterClosed()

  }



}
