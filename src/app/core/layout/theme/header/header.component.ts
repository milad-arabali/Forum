import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {UserLoginService} from "../../../../components/user-authentication/sign-in-user/shared/services/user-login.service";
import {MatDialog} from "@angular/material/dialog";
import {LogOutComponent} from "../../../../components/user-panel/log-out/log-out.component";
import {ApiService} from "../../../../shared/services/api.service";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() showSidebarEmitter: EventEmitter<boolean> = new EventEmitter<boolean>()
  sidebarStatus: boolean = true;
  name: string;
  familyName: string;

  constructor(private logOut: CookieService,
              private api: ApiService,
              private route: Router,
              private usernameLogin: UserLoginService,
              private dialog: MatDialog,
              private httpClient: HttpClient,
              private c: CookieService,
              translate: TranslateService) {
    translate.addLangs(['fa', 'klingon']);
    translate.setDefaultLang('fa');
    translate.use('fa');
  }

  ngOnInit() {
    // this.usernameLogin.selectedUser$.subscribe(
    //   user => this.username =user
    // )
    // this.usernameCookie = this.c.get('users')
    // const api = this.api.apiUrl;
    // let users1 = this.httpClient.get<UserAccountInformationModel[]>(`${api}`).subscribe(
    //   res => {
    //     res.slice().find(a => {
    //       if (a.userName === this.usernameCookie) {
    //         this.name = a.name;
    //         this.familyName = a.nameFamily
    //       }
    //     })
    //   })

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

  showSidebar() {
    this.sidebarStatus = !this.sidebarStatus;
    this.showSidebarEmitter.emit(this.sidebarStatus);
  }


  logout() {
    const dialogRef = this.dialog.open(LogOutComponent)
    dialogRef.afterClosed()

  }


}
