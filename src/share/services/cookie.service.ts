import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class CookieServiceLogin {
  // private cookie$ = new BehaviorSubject<any>({});
  // selectedUser$ = this.cookie$.asObservable();
  constructor(private cookie: CookieService) { }

  // userLogin(cookie : any){
  //   this.cookie$.next(cookie)
  //   // console.log(cookie)
  // }

    logIn( ):Promise<any>{

      return new Promise((resolve)=>{
      this.cookie.set('login','true');
      resolve(true)
    })
    }
    isLogin():boolean{
    return !!this.cookie.get('login');
    }
}
