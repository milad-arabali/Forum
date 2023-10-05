import {Component, Input, OnInit} from '@angular/core';
import {UserLoginService} from "../../../../components/user-authentication/sign-in-user/shared/services/user-login.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../../shared/services/api.service";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {SubjectService} from "../../../../components/subject-manager/shared/services/subject.service";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  @Input() showSidebar: boolean = true;
  name: string;
  familyName: string;
  isAdmin:Boolean;

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              public usernameLogin: UserLoginService,
              private cookie: CookieService,
              private httpClient: HttpClient,
              public router:Router,
              private translate: TranslateService,
              private subject:SubjectService) {
    translate.addLangs(['fa', 'klingon']);
    translate.setDefaultLang('fa');
    translate.use('fa');
  }

  ngOnInit() {

    this.api.getIsAdmin(this.cookie.get('users')).subscribe(
      value =>{
        if(value[0].isAdmin===true){
          this.usernameLogin.showBTN$.next(true)
        }
      }
    )

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
