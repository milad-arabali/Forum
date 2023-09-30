// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';;
// import {CookieServiceLogin} from "../../shared/services/cookie.service";
// import {CookieService} from "ngx-cookie-service";
//
//
//
//
// @Injectable({
//   providedIn: 'root'
// })
// export class IsAdminGuard implements CanActivate {
//
//   // @ts-ignore
//   constructor(private router: Router,
//               private cookie: CookieService,
//               private auth: CookieServiceLogin,
//               private userDataService: UserDataService) {
//   }
//
//   canActivate(route: ActivatedRouteSnapshot,
//               state: RouterStateSnapshot): Promise<boolean | UrlTree> | boolean | UrlTree {
//     if (this.auth.isLogin() || (this.cookie.check('username'))) {
//       this.userDataService.adminStatus.subscribe(result => {
//         if (result) {
//           return true;
//         } else {
//           this.router.navigate(['/home']);
//           return false;
//         }
//       });
//     } else {
//       this.router.navigate(['/sign-in']);
//     }
//     return false;
//   }
// }
