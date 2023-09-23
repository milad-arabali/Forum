import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SubjectMangerModel} from "../../../../shared/model/subject-manger.model";
import {ApiService} from "../../../../shared/services/api.service";
import {CookieService} from "ngx-cookie-service";
import {UserAccountInformationModel} from "../../../../shared/model/user-account-information.model";
import {CommentModel} from "../../../../shared/model/comment.model";


@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  fullNameUser = new UserAccountInformationModel();

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
  sorting(pageSize:number,currentPage:number): Observable<SubjectMangerModel[]> {
    return this.http.get<SubjectMangerModel[]>('http://localhost:3000/subject?_page='+`${pageSize}`+'&_limit='+`${currentPage}`);
  }
  sortingCell(sort:string,order:string){
    return this.http.get<SubjectMangerModel[]>('http://localhost:3000/subject?_sort='+`${sort}`+'&_order='+`${order}`);
  }
  sortingCellComment(sort:string,order:string,subjectId:number){
    return this.http.get<CommentModel[]>(
      'http://localhost:3000/comment?_sort='+`${sort}`+'&_order='+`${order}`+'&subjectId='+`${subjectId}`);
  }
  sortingAllComment(pageSize:number,currentPage:number,subjectId:number): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(
      'http://localhost:3000/comment?_page='+`${pageSize}`+'&_limit='+`${currentPage}`+'&subjectId='+`${subjectId}`);
  }
  allComments(subjectId:number){
    return this.http.get<CommentModel[]>('http://localhost:3000/comment?subjectId='+`${subjectId}`+'&status=1');
  }
  ViewComment(comment:number){
    return this.http.get<CommentModel[]>('http://localhost:3000/comment?id='+`${comment}`);
  }
}
