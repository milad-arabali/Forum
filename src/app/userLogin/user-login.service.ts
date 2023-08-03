import {Injectable} from '@angular/core';
import {UserDbModel} from "./userDb.model";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CookieServiceLogin} from "../../share/cookie.service";
import {ApiService} from "../../share/api.service";
import {userAccountModel} from "./useraccount.model";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  // private cookie$ = new BehaviorSubject<any>({});
  // selectedUser$ = this.cookie$.asObservable();

  public userDb: UserDbModel[] = [
    new UserDbModel(1, 'admin', 'admin', 'admin', 'admini', 22265656, 'male', new Date(7 / 88 / 7)),
    new UserDbModel(2, 'admin1', 'admin1', 'admin1', 'admini1', 22265656, 'male', new Date(7 / 88 / 7))
  ];

  s() {
    return this.userDb.slice()
  }

  // usernameLogin(username : any){
  //   this.cookie$.next(username)
  //   console.log(username)
  // }

  users !: userAccountModel[];

  signOn(username, password) {
    const message: string = `کاربر ${username} وارد شدید `
    const api = this.api.apiUrl
    let users1 = this.httpClient.get<userAccountModel[]>(`${api}`).subscribe(res => {
      console.log("sss", res)
      res.filter(
        x => x.userName === username
      ).filter(
        y => y.nationalCode === password
      )
    })

    let user = this.userDb.filter(
      x => x.userName === username
    ).filter(
      y => y.password === password)

    if (user && user.length === 1 || users1) {
      console.log("test")
      // this.userLogin.userLogin(username)
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
  }

  constructor(private router: Router, public snack: MatSnackBar, private userLogin: CookieServiceLogin, private httpClient: HttpClient, private api: ApiService) {
  }
}
