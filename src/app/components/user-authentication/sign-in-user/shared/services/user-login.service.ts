import { Injectable} from '@angular/core';
import {UserInformationModel} from "../../../../../shared/model/user-information.model";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CookieServiceLogin} from "../../../../../shared/services/cookie.service";
import {ApiService} from "../../../../../shared/services/api.service";
import {UserAccountInformationModel} from "../../../../../shared/model/user-account-information.model";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject} from "rxjs";
import {TranslateService} from "@ngx-translate/core";



@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  public showUserName$ = new BehaviorSubject<any>('');
  public showUserLastName$ = new BehaviorSubject<any>('');
  public user: UserAccountInformationModel;
  public userDb: UserInformationModel[] = [
    new UserInformationModel(
      1,
      'admin',
      'admin',
      'admin',
      'admini',
      22265656,
      'male',
      new Date(7 / 88 / 7)),
    new UserInformationModel(
      2,
      'admin1',
      'admin1',
      'admin1',
      'admini1',
      22265656,
      'male',
      new Date(7 / 88 / 7))
  ];

  constructor(private router: Router,
              public snack: MatSnackBar,
              private userLogin: CookieServiceLogin,
              private httpClient: HttpClient,
              private api: ApiService,
              private c: CookieService,
              private translate:TranslateService) {
  }
  singIn(username, value,name,family) {
    const api = this.api.apiUrl
    let users1 = this.httpClient.get<UserAccountInformationModel[]>(`${api}`).subscribe(
      res => {
        if (res.find(
          x => x.userName === username,
        )) {
          this.snack.open(this.translate.instant('snackbar.user-valid'), "", {
            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top"

          })

        } else {
          const a = res.find(a => {
            return a => a === value
          })
          this.c.set('users', username)
          this.userLogin.logIn().then(() => {
            this.router.navigate(['/home'])
          })
          this.api.postRegistration(value).subscribe(res => {
              this.snack.open(this.translate.instant('snackbar.user-register'), "", {
                duration: 3000,
                horizontalPosition: "end",
                verticalPosition: "top"
              })
            }
          )
          this.showUserName$.next(name)
          this.showUserLastName$.next(family)

        }


      })

    // if (users1) {
    //
    //   this.snack.open("نام کاربری یا پسورد وجود ندارد", "", {
    //     duration: 3000,
    //     horizontalPosition: "end",
    //     verticalPosition: "top"
    //
    //   })
    //
    // } else {
    //   this.c.set('users', username)
    //   this.userLogin.logIn().then(() => {
    //     this.router.navigate(['/home-module'])
    //
    //   })
    //   this.snack.open("کاربر جدید با موفقیت ثبت شد", "", {
    //       duration: 3000,
    //       horizontalPosition: "end",
    //       verticalPosition: "top"
    //
    //     }
    //   )
    // }

  }

  signOn(username, password) {
    const message: string = ` کاربر ${username} وارد شدید `
    const api = this.api.apiUrl
    this.httpClient.get<UserAccountInformationModel[]>(`${api}`).subscribe(
      res => {
        // console.log("sss", res)
        const a = res.find(a => {
          return a.userName === username && a.password === password
        })

        console.log("ddddd", a)
        if (a) {
          this.c.set('users', username)
          this.userLogin.logIn().then(() => {
            this.router.navigate(['/home'])
          })
          this.snack.open(message, "", {
              duration: 3000,
              horizontalPosition: "end",
              verticalPosition: "top"
            }
          )
          this.showUserName$.next(a.name)
          this.showUserLastName$.next(a.nameFamily)

        } else {
          this.snack.open(this.translate.instant('snackbar.user-valid-error'), "", {

            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top"

          })
        }
      })
    // console.log("dds",this.user)
    //   let user = this.userDb.filter(
    //     x => x.userName === username
    //   ).filter(
    //     y => y.password === password)
    //
    //   if (user && user.length === 1 || this.user) {
    //     console.log("test")
    //
    //     this.userLogin.logIn().then(() => {
    //       this.router.navigate(['/home-module'])
    //     })
    //     this.snack.open(message, "", {
    //         duration: 3000,
    //         horizontalPosition: "end",
    //         verticalPosition: "top"
    //       }
    //     )
    //   } else {
    //     this.snack.open("نام کاربری یا پسورد وجود ندارد", "", {
    //
    //       duration: 3000,
    //       horizontalPosition: "end",
    //       verticalPosition: "top"
    //
    //     })
    //   }
  }


}
