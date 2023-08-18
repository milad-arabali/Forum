import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, find, Observable} from "rxjs";
import {SubjectCategoryModel} from "../model/subject-category.model";
import {Router} from "@angular/router";
import {UserAccountInformationModel} from "../../user-panel/model/user-account-information.model";

@Injectable({
  providedIn: 'root'
})
export class SubjectCategoryService {
  public  apiUrl: string ='http://localhost:3000/subject-category'
  constructor(private http:HttpClient,
              private routr:Router) {
  }

  public Id$ = new BehaviorSubject<any>('');
  findByParentId(parentId: number): Observable<SubjectCategoryModel[]> {
    return this.http.get<SubjectCategoryModel[]>('http://localhost:3000/subject-category?parentId=' + `${parentId}`);
  }

  findId(id:number){
    let user:SubjectCategoryModel;
      this.http.get<SubjectCategoryModel[]>('http://localhost:3000/subject-category').subscribe(

      )
  }
  showInformation(){
    return this.http.get<SubjectCategoryModel>(`${this.apiUrl}`)
  }

}
