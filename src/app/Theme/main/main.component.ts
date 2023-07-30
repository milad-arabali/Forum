import {Component, Input, OnInit} from '@angular/core';
import {UserLoginService} from "../../userLogin/user-login.service";
import {CookieService} from "ngx-cookie-service";



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit{
  @Input() showSidebar: boolean =true;

   username1 : string;
 ngOnInit() {
   // this.usernameLogin.selectedUser$.subscribe( user => this.username1 = user)
   this.username1 = this.c.get('users')
 }



  constructor(private usernameLogin: UserLoginService,private c: CookieService) {
  }


}
