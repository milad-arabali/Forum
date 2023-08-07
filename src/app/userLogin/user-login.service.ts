import {computed, Injectable} from '@angular/core';
import {UserDbModel} from "./userDb.model";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CookieServiceLogin} from "../../share/cookie.service";
import {ApiService} from "../../share/api.service";
import {userAccountModel} from "./useraccount.model";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {find} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  // private cookie$ = new BehaviorSubject<any>({});
  // selectedUser$ = this.cookie$.asObservable();
  aa: number;
  public user: userAccountModel;
  public userDb: UserDbModel[] = [
    new UserDbModel(1, 'admin', 'admin', 'admin', 'admini', 22265656, 'male', new Date(7 / 88 / 7)),
    new UserDbModel(2, 'admin1', 'admin1', 'admin1', 'admini1', 22265656, 'male', new Date(7 / 88 / 7))
  ];


  // usernameLogin(username : any){
  //   this.cookie$.next(username)
  //   console.log(username)
  // }

  singIn(username, value) {
    const api = this.api.apiUrl
    let users1 = this.httpClient.get<userAccountModel[]>(`${api}`).subscribe(res => {

      if (res.find(
        x => x.userName === username,
      )) {
        this.snack.open("نام کاربری وجود دارد", "", {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top"

        })

      } else {

        this.c.set('users', username)
        this.userLogin.logIn().then(() => {
          this.router.navigate(['/home'])
        })
        this.api.postRegistration(value).subscribe(res => {
            this.snack.open("کاربر جدید با موفقیت ثبت شد", "", {
              duration: 3000,
              horizontalPosition: "end",
              verticalPosition: "top"
            })
          }
        )
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
    //     this.router.navigate(['/home'])
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
    const message: string = `کاربر ${username} وارد شدید `
    const api = this.api.apiUrl
    let users1 = this.httpClient.get<userAccountModel[]>(`${api}`).subscribe(
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
        } else {
          this.snack.open("نام کاربری یا پسورد وجود ندارد", "", {

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
    //       this.router.navigate(['/home'])
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


  constructor(private router: Router,
              public snack: MatSnackBar,
              private userLogin: CookieServiceLogin,
              private httpClient: HttpClient,
              private api: ApiService,
              private c: CookieService) {
  }
}
