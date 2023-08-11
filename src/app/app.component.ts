import {Component, OnInit} from '@angular/core';
import {CookieServiceLogin} from "../share/services/cookie.service";
import {CookieService} from "ngx-cookie-service";

import {Router} from "@angular/router";
import {UserAccountInformationModel} from "./components/user-panel/model/user-account-information.model";
import {ApiService} from "../share/services/api.service";
import {HttpClient} from "@angular/common/http";
import {UserLoginService} from "./components/user-panel/services/user-login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'تالارگفتمان';
  lifeTime: boolean = false;
  userLife: string;
  username1: string;

  constructor(private userLifetime: CookieServiceLogin,
              private cookie: CookieService,
              private api: ApiService,
              private httpClient: HttpClient,
              private userLogin: UserLoginService) {


  }

  ngOnInit() {
    this.username1 = this.cookie.get('users')
    const api = this.api.apiUrl;
    let users1 = this.httpClient.get<UserAccountInformationModel[]>(`${api}`).subscribe(
      res => {
        res.find(a => {
          if (a.userName === this.username1) {
            this.userLogin.showUserName$.next(
              a.name
            )
            this.userLogin.showUserLastName$.next(
              a.nameFamily
            )
          }
        })
      })


  }


}
