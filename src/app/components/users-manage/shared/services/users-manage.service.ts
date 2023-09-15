import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {UserAccountInformationModel} from "../../../../shared/model/user-account-information.model";
import {ApiService} from "../../../../shared/services/api.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UsersManageService {

  constructor(private http:HttpClient,
              private api:ApiService,
              private route:Router) { }
  checkId(): Observable<UserAccountInformationModel[]> {
    return this.http.get<UserAccountInformationModel[]>('http://localhost:3000/enquiry');
  }
  UsersSorting(pageSize:number,currentPage:number): Observable<UserAccountInformationModel[]> {
    return this.http.get<UserAccountInformationModel[]>('http://localhost:3000/enquiry?_page='+`${pageSize}`+'&_limit='+`${currentPage}`);
  }
  findUser(a: string): Observable<UserAccountInformationModel[]> {
    return this.http.get<UserAccountInformationModel[]>(
      'http://localhost:3000/enquiry?' + `${a}`);
  }
  checkIsAdmin(user: String) {
    this.api.getIsAdmin(user).subscribe(
      value => {
        if (!value[0].isAdmin) {
          this.route.navigate(['/home'])
        }
      })
  }
  sortingCellUsers(sort:string,order:string){
    return this.http.get<UserAccountInformationModel[]>('http://localhost:3000/enquiry?_sort='+`${sort}`+'&_order='+`${order}`);
  }
}
