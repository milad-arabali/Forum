import {Component, OnInit} from '@angular/core';
import {CookieServiceLogin} from "../share/services/cookie.service";
import {CookieService} from "ngx-cookie-service";

import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private userLifetime : CookieServiceLogin,private cookie : CookieService ,private router:Router) {
  }

  title = 'Forum';
  lifeTime: boolean = false;
  userLife: string ;

  ngOnInit() {
     // this.userLifetime.selectedUser$.subscribe(
     //  (value) => { this.userLife = value;
     //     this.cookie.set(String(this.userLife) , String(this.lifeTime));
     //     this.lifeTime=true;
     //   }
     //
     //
     // )
    // if(this.lifeTime){
    //   this.router.navigate(['/users'])
    // }else{
    //   this.router.navigate(['/signin'])
    // }

  }


}
