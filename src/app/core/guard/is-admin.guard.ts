import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {CookieServiceLogin} from "../../shared/services/cookie.service";
import {UserLoginService} from "../../components/user-authentication/sign-in-user/shared/services/user-login.service";




@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(private auth: CookieServiceLogin
              , private router: Router,
              private userLogin:UserLoginService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
   return true
  }
}
