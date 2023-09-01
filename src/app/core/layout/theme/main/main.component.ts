import {Component, Input, OnInit} from '@angular/core';
import {UserLoginService} from "../../../../components/user-authentication/sign-in-user/shared/services/user-login.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../../shared/services/api.service";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  @Input() showSidebar: boolean = true;
  name: string;
  familyName: string;

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private usernameLogin: UserLoginService,
              private c: CookieService,
              private httpClient: HttpClient,
              public router:Router,
              private translate: TranslateService) {
    translate.addLangs(['fa', 'klingon']);
    translate.setDefaultLang('fa');
    translate.use('fa');
  }

  ngOnInit() {
    // this.username1 = this.c.get('users')
    // const api = this.api.apiUrl;
    // let users1 = this.httpClient.get<UserAccountInformationModel[]>(`${api}`).subscribe(
    //   res => {
    //     res.slice().find(a => {
    //       if (a.userName === this.username1) {
    //         this.name = a.name;
    //         this.familyName = a.nameFamily
    //       }
    //     })
    //   })
    // this.usernameLogin.showUserName$.subscribe(
    //   a=>{
    //     if(a){
    //       this.name=a
    //       console.log("aaa",a)
    //     }
    //
    //   }
    // )
    this.usernameLogin.showUserName$.subscribe(
      a => {
        if (a) {
          this.name = a
        }
      }
    )
    this.usernameLogin.showUserLastName$.subscribe(
      a => {
        if (a) {
          this.familyName = a
        }
      }
    )
  }


}