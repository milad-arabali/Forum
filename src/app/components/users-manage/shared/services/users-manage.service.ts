import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {UserAccountInformationModel} from "../../../../shared/model/user-account-information.model";

@Injectable({
  providedIn: 'root'
})
export class UsersManageService {
  public deleteUsersGrid: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor(private http:HttpClient) { }
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
}
