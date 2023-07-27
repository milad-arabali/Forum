import { Injectable} from '@angular/core';
import {UserDbModel} from "./userDb.model";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CookieServiceLogin} from "../../share/cookie.service";
import {BehaviorSubject} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  private cookie$ = new BehaviorSubject<any>({});
  selectedUser$ = this.cookie$.asObservable();

  private userDb : UserDbModel[]=[
    new UserDbModel('admin','admin'),
    new UserDbModel('admin1','admin1')
  ];
  usernameLogin(username : any){
    this.cookie$.next(username)
    console.log(username)
  }
   signOn(username,password){
         const message : string = `کاربر ${ username} وارد شدید `
         let user = this.userDb.filter(
           x => x.userNumber === username
         ).filter(
           y => y.password === password)

        if( user && user.length === 1){
          console.log("test")
                  // this.userLogin.userLogin(username)
                  this.userLogin.logIn().then(()=>{
                    this.router.navigate(['/users'])
                  })
              this.snack.open(message,"",{
                duration:3000,
                horizontalPosition: "end",
                verticalPosition: "top"

              }
          )

        }else {
          this.snack.open("کاربر وجود ندارد","",{

            duration:3000,
            horizontalPosition: "end",
            verticalPosition: "top"

          })
        }
   }

  constructor(private router : Router ,public snack : MatSnackBar,private  userLogin: CookieServiceLogin ) { }
}
