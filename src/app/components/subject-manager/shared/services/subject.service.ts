import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SubjectMangerModel} from "../../../../shared/model/subject-manger.model";
import {ApiService} from "../../../../shared/services/api.service";
import {CookieService} from "ngx-cookie-service";
import {UserAccountInformationModel} from "../../../../shared/model/user-account-information.model";


@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  fullNameUser = new UserAccountInformationModel();
  cookieUser: string;

  constructor(private http: HttpClient,
              private api: ApiService,
              private cookie: CookieService) {

    this.http.get<UserAccountInformationModel>(`http://localhost:3000/enquiry?userName=` + `${this.cookie.get('users')}`).subscribe(
      value =>
        this.fullNameUser.userName = value.userName
    )


  }

  checkId(): Observable<SubjectMangerModel[]> {
    return this.http.get<SubjectMangerModel[]>('http://localhost:3000/subject');
  }

  findSubject(a: string): Observable<SubjectMangerModel[]> {
    return this.http.get<SubjectMangerModel[]>(
      'http://localhost:3000/subject?' + `${a}`);
  }

  currentUser() {

  }
}
