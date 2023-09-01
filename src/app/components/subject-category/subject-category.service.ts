import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, find, Observable} from "rxjs";
import {SubjectCategoryModel} from "../../shared/model/subject-category.model";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class SubjectCategoryService {
  public apiUrl: string = 'http://localhost:3000/subject-category'

  constructor(private http: HttpClient) {
  }

  public deleteSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public selectParentId$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  findByParentId(parentId: number): Observable<SubjectCategoryModel[]> {
    return this.http.get<SubjectCategoryModel[]>('http://localhost:3000/subject-category?parentId=' + `${parentId}`);
  }


}
