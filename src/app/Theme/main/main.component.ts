import {Component, Input, OnInit} from '@angular/core';
import {UserLoginService} from "../../userLogin/user-login.service";



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit{
  @Input() showSidebar: boolean =true;

   username1 : string;
 ngOnInit() {
   this.usernameLogin.selectedUser$.subscribe( user => this.username1 = user)

 }



  constructor(private usernameLogin: UserLoginService) {
  }


}
