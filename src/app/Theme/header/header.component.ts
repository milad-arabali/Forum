import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {UserLoginService} from "../../userLogin/user-login.service";

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
  constructor(private logOut: CookieService , private  route : Router,private usernameLogin: UserLoginService) {
  }
  logout() {
    this.logOut.delete('login','true');
    this.route.navigate(['/signin'])
  }



}
