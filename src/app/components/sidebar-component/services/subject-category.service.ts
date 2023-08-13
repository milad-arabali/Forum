import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SubjectCategoryModel} from "../model/subject-category.model";

@Injectable({
  providedIn: 'root'
})
export class SubjectCategoryService {

  constructor(private http:HttpClient) {
  }


  findByParentId(parentId: number): Observable<SubjectCategoryModel[]> {
    return this.http.get<SubjectCategoryModel[]>('http://localhost:3000/subject-category?parentId=' + `${parentId}`);
  }
}
