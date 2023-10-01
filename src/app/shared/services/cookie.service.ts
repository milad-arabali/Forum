import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class CookieServiceLogin {
  constructor(private cookie: CookieService,
              private api:ApiService) { }
    logIn( ):Promise<any>{
      return new Promise((resolve)=>{
      this.cookie.set('login','true');
      resolve(true)
    })
    }
    isLogin():boolean{
    return !!this.cookie.get('login');
    }
  isAdmin():boolean{
    return !!this.cookie.get('admin');
   }
}
